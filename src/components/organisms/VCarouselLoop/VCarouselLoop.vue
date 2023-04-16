<template>
    <component :is="wrapperTag" :class="$style.root" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
        <slot />
    </component>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import Vue from 'vue'
import type { VueConstructor } from 'vue'
import Carousel from '~/mixins/Carousel'
import { horizontalLoop, HorizontalLoopTimeline } from '~/utils/gsap/horizontal-loop'
import eventBus from '~/utils/event-bus'
import EventType from '~/constants/event-type'
import { mediaIsMin } from '~/utils/media'

interface Component extends Vue {
    slides: HTMLElement[]
    timeline?: HorizontalLoopTimeline | null
    intersectionObserver?: IntersectionObserver | null
    hadInteraction: boolean
    autoplay: boolean
}

export default mixins(Carousel, Vue as VueConstructor<Component>).extend({
    name: 'VCarouselLoop',
    props: {
        value: Number,
        wrapperTag: { type: String, default: 'div' },
    },
    data() {
        return {
            isVisible: false,
        }
    },
    computed: {
        prefersReducedMotion(): boolean {
            return this.$store.state.prefersReducedMotion
        },
    },
    watch: {
        value() {
            if (this.timeline?.current() === this.value) return

            this.timeline?.toIndex(this.value, {
                duration: 0.7,
                ease: 'power2.inOut',
                // onComplete: () => {
                //     this.timeline!.resume()
                // },
            })
        },
        isVisible() {
            if (!this.autoplay) return

            if (this.isVisible) this.timeline?.resume()
            else this.timeline?.pause()
        },
    },
    created() {
        this.slides = []
    },
    mounted() {
        this.createIntersectionObserver()
        this.updateAutoplay()
        eventBus.$on(EventType.RESIZE, this.updateAutoplay)
    },
    beforeDestroy() {
        this.timeline?.dispose()
        this.timeline?.draggable?.removeEventListener('dragstart', this.onTimelineDraggableDragStart)
        this.timeline = null

        eventBus.$off(EventType.RESIZE, this.updateAutoplay)
        this.disposeIntersectionObserver()
    },
    methods: {
        createIntersectionObserver() {
            this.intersectionObserver = new IntersectionObserver(this.onIntersectionObserverChange)
            this.intersectionObserver.observe(this.$el)
        },
        disposeIntersectionObserver() {
            this.intersectionObserver?.disconnect()
            this.intersectionObserver = null
        },
        init() {
            this.slides = Array.from(this.$el.children) as HTMLElement[]
            this.timeline = horizontalLoop(this.slides, {
                draggable: true,
                onChange: this.onTimelineChange,
                repeat: -1,
                paused: !this.isVisible || !this.autoplay,
                // speed: 1,
            })
            this.timeline.draggable?.addEventListener('dragstart', this.onTimelineDraggableDragStart)
        },
        updateAutoplay() {
            this.autoplay = mediaIsMin('md') && !this.prefersReducedMotion

            if (this.autoplay) {
                if (this.isVisible && !this.hadInteraction) this.resume()
            } else {
                this.pause()
            }
        },
        onTimelineChange(_item: HTMLElement, index: number) {
            this.$emit('input', index)
        },
        onMouseEnter() {
            this.pause()
        },
        onMouseLeave() {
            if (this.autoplay) this.resume()
        },
        onTouchStart() {
            this.hadInteraction = true
            this.timeline?.pause()
        },
        onTouchEnd() {
            if (!this.hadInteraction) this.resume()
        },
        resume() {
            this.timeline?.resume()
        },
        pause() {
            this.timeline?.pause()
        },
        onIntersectionObserverChange(entries: IntersectionObserverEntry[]) {
            this.isVisible = entries[0].isIntersecting
        },
        onTimelineDraggableDragStart() {
            this.hadInteraction = true
            this.timeline?.pause()
        },
    },
})
</script>

<style lang="scss" module>
.root {
    display: flex;
    margin-inline: calc(var(--gutter) * -1);
    padding-inline: var(--gutter);
    user-select: none;
}
</style>
