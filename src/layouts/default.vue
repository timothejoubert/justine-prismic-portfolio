<template>
    <div :class="[$style.root, isSplashScreenDone && $style['root--ready']]">
        <v-splash-screen-wrapper />
        <v-header />
        <v-nav ref="nav" />
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
        <lazy-v-footer v-if="isHomePage" ref="footer" />

        <client-only>
            <v-media-viewer-wrapper />
        </client-only>
    </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import Resize from '~/mixins/Resize'
import MutationType from '~/constants/mutation-type'
import { isHomePage } from '~/utils/prismic/document'
import { isHomePath } from '~/utils/route-path'

export default mixins(Resize).extend({
    name: 'default',
    mounted() {
        this.$store.commit(
            MutationType.PREFERS_REDUCED_MOTION,
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        )
    },
    computed: {
        isSplashScreenDone(): boolean {
            return this.$store.state.splashScreenDone
        },
        isHomePage(): boolean {
            return isHomePage(this.$store.state.currentPageData) || isHomePath(this.$route)
        },
    },
})
</script>
<style lang="scss" module>
.root {
    position: relative;
    overflow: hidden;
    height: 100vh;

    &--ready {
        height: unset;
    }
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
