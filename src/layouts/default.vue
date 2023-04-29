<template>
    <div :class="[$style.root, (isSplashScreenDone || !displaySplashScreen) && $style['root--ready']]">
        <v-splash-screen-wrapper v-if="displaySplashScreen" />
        <v-header />
        <v-nav ref="nav" />
        <nuxt-picture
            provider="static"
            width="1673"
            placeholder="10"
            height="1109"
            src="/images/texture.png"
            :class="$style.texture"
            :img-attrs="{ class: $style['texture__image'] }"
        />
        <Nuxt />
        <v-footer v-if="isHomePage" />

        <client-only>
            <v-media-viewer-wrapper />
        </client-only>

        <!-- eslint-disable-next-line vue/no-v-html -->
        <script type="application/ld+json" v-html="websiteInfos"></script>
    </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import Resize from '~/mixins/Resize'
import MutationType from '~/constants/mutation-type'
import { isHomePage } from '~/utils/prismic/document'
import { isHomePath } from '~/utils/route-path'
import toBoolean from '~/utils/to-boolean'
import GeneralsConst from '~/constants/app'
import JsonLd from '~/mixins/JsonLd'

export default mixins(Resize, JsonLd).extend({
    name: 'default',
    mounted() {
        this.$store.commit(
            MutationType.PREFERS_REDUCED_MOTION,
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        )
    },
    computed: {
        displaySplashScreen(): boolean {
            return toBoolean(GeneralsConst.DISPLAY_SPLASH_SCREEN_ONCE)
        },
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
