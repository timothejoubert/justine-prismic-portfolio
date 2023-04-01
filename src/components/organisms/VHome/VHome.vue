<template>
    <div :class="$style.root">
        <v-text ref="title" class="text-h1" :class="$style.title" :content="pageData.title" />
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
    computed: {},
    mounted() {
        this.initScrollAnimation()
    },
    methods: {
        initScrollAnimation() {
            gsap.registerPlugin(ScrollTrigger)

            const title = (this.$refs.title as Vue).$el as HTMLElement

            // https://codepen.io/GreenSock/pen/WNvVOWw?editors=0010
            gsap.to(title, {
                scrollTrigger: {
                    markers: true,
                    trigger: this.$el,
                    scrub: true,
                    start: 'top',
                    end: 'bottom',
                },
                scale: 0.2,
                y: -500,
                ease: 'none',
            })
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
    //font-size: rem(120);
    color: color(orange);
    transform-origin: center center;
}
</style>
