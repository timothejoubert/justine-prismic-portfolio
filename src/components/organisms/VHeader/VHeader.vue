<template>
    <div :class="[$style.root, isSticky && $style['root--sticky']]">
        <nuxt-link ref="title" to="/" :class="$style.link" class="text-h1">
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
            } else this.setStickyPosition()
        },
    },
    mounted() {
        if (isHomePath(this.$route) || isHomePage(this.$store.state.currentPageData)) this.initScrollAnimation()
        else this.setStickyPosition()
    },
    methods: {
        initScrollAnimation() {
            if (this.tween) return

            gsap.registerPlugin(ScrollTrigger)
            const root = this.$el as HTMLElement
            const title = (this.$refs.title as Vue).$el as HTMLElement

            gsap.set(title, { clearProps: 'all' })

            if (!root || !title) {
                this.setStickyPosition()
                return
            }

            this.tween = gsap.to(title, {
                scrollTrigger: {
                    markers: false,
                    trigger: root,
                    scrub: true,
                    start: 'top',
                    end: 'bottom',
                    onLeave: (state) => (this.isSticky = !state.isActive),
                    onEnterBack: (state) => (this.isSticky = !state.isActive),
                },
                scale: 0.2,
                y: -500,
                ease: 'none',
            })
        },
        setStickyPosition() {
            const title = (this.$refs.title as Vue).$el as HTMLElement

            this.isSticky = true

            gsap.set(title, { scale: 0.2, y: -500 })
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
.root {
    position: fixed;
    z-index: 103;
    display: flex;
    width: 100%;
    height: 100vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    pointer-events: none;
}

.link {
    position: relative;
    color: color(orange);
    font-size: rem(148) !important;
    pointer-events: none;
    transform-origin: center center;

    .root--sticky & {
        pointer-events: auto;
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
