<template>
    <section v-if="sketchList.length" :class="$style.root">
        <v-masonry :enabled="true" :column-number="5" @container-width="setContainerWidth">
            <div ref="sketchs" :class="$style['sketch-list']">
                <v-masonry-item v-for="(sketch, i) in sketchList" :key="i">
                    <div :class="$style.sketch">
                        <nuxt-img
                            provider="prismic"
                            :src="sketch.media.url"
                            sizes="xs:20vw md:20vw lg:20vw vl:20vw xl:20vw xxl:20vw hd:20vw"
                            :class="$style.image"
                        />
                        <v-text :content="sketch.name" class="text-body-xs" :class="$style.content" />
                    </div>
                </v-masonry-item>
            </div>
        </v-masonry>
    </section>
</template>

<script lang="ts">
import { getSliceComponentProps } from '@prismicio/vue/components'
import Vue from 'vue'
import type { VueConstructor } from 'vue'
import { mapRange } from '~/utils/utils'
import eventBus from '~/utils/event-bus'
import EventType from '~/constants/event-type'

interface Component {
    resizeObserver: null | ResizeObserver
    containerWidth: null | number
    containerHeight: null | number
}

export default (Vue as VueConstructor<Vue & Component>).extend({
    name: 'SketchBook',
    props: getSliceComponentProps(['slice', 'index', 'slices', 'context']),
    computed: {
        sketchList(): { media: any; name: string }[] {
            return this.slice.items
        },
    },
    mounted() {
        this.$store.dispatch('disableScroll', { element: this.$el, options: { reserveScrollBarGap: false } })

        eventBus.$on(EventType.RESIZE, this.setContainerHeight)
        window.addEventListener('mousemove', this.onMouseMove)
        this.initResizeObserver()
    },
    beforeDestroy() {
        this.$store.dispatch('enableScroll', { element: this.$el })

        eventBus.$off(EventType.RESIZE, this.setContainerHeight)
        window.removeEventListener('mousemove', this.onMouseMove)
        this.disposeResizeObserver()
    },
    methods: {
        initResizeObserver() {
            this.resizeObserver = new ResizeObserver(() => {
                this.setContainerHeight()
            })
            this.resizeObserver.observe(this.$el)
        },
        disposeResizeObserver() {
            this.resizeObserver?.disconnect()
            this.resizeObserver = null
        },
        onMouseMove(event: MouseEvent) {
            if (!this.containerWidth || !this.containerHeight) return
            const { clientX: x, clientY: y } = event

            const translateX = mapRange(x, 0, window.innerWidth, 200, this.containerWidth * -1 + window.innerWidth)
            const translateY = mapRange(y, 0, window.innerHeight, 0, this.containerHeight * -1 + window.innerHeight)

            ;(this.$el as HTMLElement).animate(
                {
                    transform: `translate(${Math.round(translateX)}px, ${Math.round(translateY)}px)`,
                },
                { duration: 6500, fill: 'forwards' }
            )
        },
        setContainerWidth(value: number) {
            this.containerWidth = value - (this.$el as HTMLElement).getBoundingClientRect().x
        },
        setContainerHeight() {
            this.containerHeight = (this.$el as HTMLElement).offsetHeight - 50

            this.onEnter()
        },
        onEnter() {
            if (!this.containerWidth || !this.containerHeight) return

            const x = this.containerWidth * -0.5 + window.innerWidth
            const y = this.containerHeight * -0.5 + window.innerHeight / 2

            ;(this.$el as HTMLElement).animate(
                {
                    transform: `translate(${Math.round(x)}px, ${Math.round(y)}px)`,
                },
                { duration: 1000, fill: 'forwards' }
            )
        },
    },
})
</script>

<style lang="scss" module>
.root {
    padding: rem(300) 0 0 0;
}

.sketch-list {
    display: flex;
    align-items: flex-start;
    gap: 0 rem(150);
}

.sketch {
    position: relative;
    display: flex;
    width: rem(350);
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    padding: rem(55) rem(30);
    margin-top: rem(150);
    background-color: #fff;
    transition: transform 0.5s ease(out-quad);

    &::after {
        position: absolute;
        border: 1px solid #000;
        content: '';
        inset: 0;
        opacity: 0.1;
    }

    @media (hover: hover) {
        &:hover {
            transform: scale(1.05);
        }
    }
}

.image {
    width: 100%;
    filter: grayscale(1);
    transition: filter 0.5s ease(out-quad);

    @media (hover: hover) {
        .sketch:hover & {
            filter: grayscale(0);
        }
    }
}

.content {
    position: absolute;
    bottom: 0;
    left: rem(30);
    max-width: 70%;
    opacity: 0;
    transform: translateY(0);
    transition: transform 0.3s ease(out-quad), opacity 0.3s ease(out-quad);

    @media (hover: hover) {
        .sketch:hover & {
            opacity: 0.4;
            transform: translateY(-50%);
        }
    }
}
</style>
