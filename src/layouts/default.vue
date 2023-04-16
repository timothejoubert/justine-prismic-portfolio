<template>
    <div :class="$style.root">
        <!--    <template v-if="splashScreenState !== 'hidden'">-->
        <!--      <transition name="splash-screen">-->
        <!--        <v-splash-screen v-if="splashScreenState !== 'done'" v-model="splashScreenState" :content="siteName" />-->
        <!--      </transition>-->
        <!--    </template>-->

        <nuxt-link v-if="!isHomePage" to="/" :class="$style.title">
            <h1 :class="$style.logo">{{ siteName }}</h1>
        </nuxt-link>

        <v-nav ref="nav" :class="$style.nav" />

        <nuxt-picture
            provider="static"
            sizes="sm:480 md:768 lg:1024"
            width="1673"
            height="1109"
            src="/images/texture.png"
            :class="$style.texture"
            :img-attrs="{ class: $style['texture__image'] }"
        />

        <Nuxt />

        <v-footer ref="footer" />
    </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import Vue from 'vue'
import type { VueConstructor } from 'vue'
import Resize from '~/mixins/Resize'
import MutationType from '~/constants/mutation-type'
import SplashScreen from '~/mixins/SplashScreen'
import { isHomePage } from '~/utils/prismic/document'

interface Component {
    intersectionObserver: null | IntersectionObserver
}

export default mixins(Resize, SplashScreen, Vue as VueConstructor<Vue & Component>).extend({
    name: 'default',
    data() {
        return {
            isFooterVisible: false,
        }
    },
    mounted() {
        this.$store.commit(
            MutationType.PREFERS_REDUCED_MOTION,
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        )
        this.createIntersectionObserver()
    },
    computed: {
        siteName(): string {
            return this.$store.state.settings.data.site_name
        },
        isHomePage(): boolean {
            return isHomePage(this.$store.state.currentPageData)
        },
    },
    beforeDestroy() {
        this.disposeIntersectionObserver()
    },
    watch: {
        isFooterVisible(value: boolean) {
            if (value) document.addEventListener('scroll', this.onScroll)
            else document.removeEventListener('scroll', this.onScroll)
        },
    },
    methods: {
        onScroll() {
            const nav = (this.$refs.nav as Vue).$el as HTMLElement
            const footer = (this.$refs.footer as Vue).$el as HTMLElement
            if (!nav || !footer) return
            const bottomOffset = Math.abs(footer.getBoundingClientRect().top - window.innerHeight) * -1

            nav.style.transform = `translate(-50%, ${bottomOffset}px)`
        },
        createIntersectionObserver() {
            const el = (this.$refs.footer as Vue).$el as HTMLElement

            this.intersectionObserver = new IntersectionObserver(this.onIntersectionObserverChange)
            this.intersectionObserver.observe(el)
        },
        onIntersectionObserverChange([entry]: IntersectionObserverEntry[]) {
            this.isFooterVisible = entry.isIntersecting
        },
        disposeIntersectionObserver() {
            this.intersectionObserver?.disconnect()
            this.intersectionObserver = null
        },
    },
})
</script>
<style lang="scss" module>
.root {
    min-height: 100vh;
}

.nav {
    position: fixed;
    z-index: 101;
    bottom: rem(20);
    left: 50%;
    transform: translateX(-50%);

    &--sticky {
        background-color: red !important;
    }
}

.title {
    position: fixed;
    z-index: 101;
    top: app(top-bar-top);
    left: 50%;
    transform: translateX(-50%);
}

.logo {
    color: color(orange);
    font-family: $dida;
    font-size: rem(22);
    font-weight: 300;
}

.texture {
    position: fixed;
    overflow: hidden;
    border-radius: rem(40);
    inset: rem(20);
    opacity: 0.5;
    pointer-events: none;
}

.texture__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
