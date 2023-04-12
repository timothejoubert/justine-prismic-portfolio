<template>
    <div :class="$style.root">
        <nuxt-link :to="$config.homePath">
            <v-text ref="title" class="text-h1" :class="$style.title" :content="title" />
        </nuxt-link>
    </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Vue from 'vue'
import PageProvider from '~/mixins/PageProvider'

export default mixins(PageProvider).extend({
    name: 'VHome',
    mounted() {
        if (this.$refs.title) this.initScrollAnimation()
    },
    methods: {
        initScrollAnimation() {
            gsap.registerPlugin(ScrollTrigger)

            const root = this.$el as HTMLElement
            const title = (this.$refs.title as Vue).$el as HTMLElement

            // https://codepen.io/GreenSock/pen/WNvVOWw?editors=0010
            gsap.to(title, {
                scrollTrigger: {
                    markers: true,
                    trigger: root,
                    scrub: true,
                    start: '10px',
                    end: 'bottom',
                    onLeave: () => root.classList.add(this.$style.fixed),
                    onEnterBack: () => root.classList.remove(this.$style.fixed),
                },
                scale: 0.2,
                y: -500,
                ease: 'none',
            })
        },
    },
    computed: {
        title(): string {
            return this.pageData?.title || 'justine'
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
    align-items: center;
    justify-content: center;
    pointer-events: none;
}

.title {
    color: color(orange);
    pointer-events: auto;
    transform-origin: center center;
}
</style>
