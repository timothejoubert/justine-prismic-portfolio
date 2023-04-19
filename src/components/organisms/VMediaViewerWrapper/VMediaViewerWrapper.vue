<template>
    <transition :name="$style['viewer-transition']" @before-enter="onBeforeEnter" @enter="onEnter">
        <lazy-v-media-viewer v-if="$store.state.mediaViewerData" ref="viewer" @close="onClose" />
    </transition>
</template>

<script lang="ts">
import Vue from 'vue'
import { gsap } from 'gsap'
import MutationType from '~/constants/mutation-type'

export default Vue.extend({
    name: 'VMediaViewerWrapper',
    watch: {
        $route() {
            this.onClose()
        },
    },
    beforeDestroy() {
        this.onClose()
    },
    methods: {
        onBeforeEnter() {
            // this.$store.dispatch('disableScroll', { element: this.$el })
        },
        onEnter() {
            const viewer = (this.$refs.viewer as Vue).$el
            const image = viewer?.querySelector('img')
            if (!image) return

            gsap.from(image, {
                yPercent: -10,
                scale: 1.4,
                duration: 1.4,
                ease: 'power2.out',
                onComplete: () => {
                    gsap.to(image, { clearProps: 'all' })
                },
            })
        },
        onClose() {
            // this.$store.dispatch('enableScroll', { element: this.$el })
            this.$store.commit(MutationType.MEDIA_VIEWER_DATA, null)
            this.$store.commit(MutationType.MEDIA_VIEWER_SLIDE_INDEX, 0)
        },
    },
})
</script>

<style lang="scss" module>
.viewer-transition {
    &:global(#{'-enter-active'}),
    &:global(#{'-leave-active'}) {
        transition: transform 1s ease(out-quad);
    }

    &:global(#{'-enter'}),
    &:global(#{'-leave-to'}) {
        transform: translateY(100%);
    }
}
</style>
