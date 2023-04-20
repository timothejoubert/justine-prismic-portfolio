<template>
    <div :class="[$style.root, isSticky && $style['root--sticky']]">
        <nuxt-link ref="title" to="/" :class="$style.title" class="text-h1">
            <div>{{ title.firstName }}</div>
            <transition :name="$style.decorator">
                <div v-if="isSticky" ref="family" :class="$style['title-decorator']">{{ title.familyParsed }}</div>
            </transition>
        </nuxt-link>
    </div>
</template>

<script lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Vue from 'vue'
import type { VueConstructor } from 'vue'
import { isHomePath } from '~/utils/route-path'
import { isHomePage } from '~/utils/prismic/document'
import eventBus from '~/utils/event-bus'
import EventType from '~/constants/event-type'

interface Component {
    tween: null | GSAPTween
}

export default (Vue as VueConstructor<Vue & Component>).extend({
    name: 'VHome',
    data() {
        return {
            isSticky: false,
        }
    },
    computed: {
        title(): { firstName: string; familyParsed: string } {
            const siteName = this.$store.state.settings.data.site_name
            const firstName = siteName?.split(' ')?.[0] || 'justine'
            const familyParsed = '.' + siteName?.split(' ')?.[1]?.charAt(0) || 'S'

            return { firstName, familyParsed }
        },
    },
    watch: {
        $route() {
            if (isHomePath(this.$route) || isHomePage(this.$store.state.currentPageData)) {
                this.isSticky = false
                gsap.set(this.$refs.family as HTMLElement, { opacity: 0 })
                this.initScrollAnimation()
            } else this.setInitialPosition()
        },
    },
    mounted() {
        if (isHomePath(this.$route) || isHomePage(this.$store.state.currentPageData)) this.initScrollAnimation()
        else this.setInitialPosition()

        eventBus.$on(EventType.RESIZE, this.onResize)
    },
    beforeDestroy() {
        this.killTween()
        eventBus.$off(EventType.RESIZE, this.onResize)
    },
    methods: {
        onResize() {
            this.killTween()
            this.initScrollAnimation()
        },
        initScrollAnimation() {
            if (this.tween) return

            gsap.registerPlugin(ScrollTrigger)
            const root = this.$el as HTMLElement
            const title = (this.$refs.title as Vue).$el as HTMLElement

            gsap.set(title, { clearProps: 'all' })

            if (!root || !title) {
                this.setInitialPosition()
                return
            }

            const multiplier = Math.min(window.innerWidth / 200, 6.2)

            const startedHeight = title.getBoundingClientRect().height * multiplier
            const windowHeight = window.innerHeight
            const startedDist = windowHeight / 2 - startedHeight / 2

            this.tween = gsap.from(title, {
                scrollTrigger: {
                    scrub: true,
                    start: 'top',
                    end: `+=${windowHeight}`,
                    onLeave: (state) => (this.isSticky = !state.isActive),
                    onEnterBack: (state) => (this.isSticky = !state.isActive),
                },
                scale: multiplier,
                y: startedDist,
                ease: 'none',
            })
        },
        setInitialPosition() {
            const title = (this.$refs.title as Vue).$el as HTMLElement

            this.isSticky = true

            gsap.set(title, { clearProps: 'all' })
            this.killTween()
        },
        killTween() {
            this.tween?.kill()
            this.tween = null
        },
    },
})
</script>

<style lang="scss" module>
$headerHeight: rem(90);

.root {
    position: fixed;
    z-index: 103;
    display: flex;
    width: 100%;
    height: $headerHeight;
    align-items: center;
    justify-content: center;
}

.title {
    position: relative;
    color: color(orange);
    font-size: rem(28) !important;
    transform-origin: center center;

    .root:not(.root--sticky) & {
        pointer-events: none;
    }
}

.title-decorator {
    position: absolute;
    top: 0;
    right: 0;
    transform: translateX(#{calc(100% + rem(8))});
}

.decorator:global(#{'-enter-active'}),
.decorator:global(#{'-leave-active'}) {
    transition: 0.3s;
    transition-property: opacity, transform;
    transition-timing-function: ease(out-quad);
}

.decorator:global(#{'-enter'}),
.decorator:global(#{'-leave-to'}) {
    opacity: 0;
    transform: translateX(0);
}
</style>
