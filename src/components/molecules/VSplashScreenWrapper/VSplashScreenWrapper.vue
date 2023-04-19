<template>
    <transition :name="$style['splash-screen']">
        <v-splash-screen v-if="splashScreenState !== 'leaved'" v-model="splashScreenState" />
    </transition>
</template>

<script lang="ts">
import Vue from 'vue'
import toBoolean from '~/utils/to-boolean'
import GeneralsConst from '~/constants/app'
import MutationType from '~/constants/mutation-type'

export type SplashScreenState = 'pending' | 'beforeEnter' | 'beforeLeaved' | 'leaved'

export default Vue.extend({
    name: 'VSplashScreenWrapper',
    data() {
        return {
            splashScreenState: 'pending' as SplashScreenState,
        }
    },
    watch: {
        splashScreenState(state: SplashScreenState) {
            if (state === 'beforeLeaved') this.onSplashScreenDone()
        },
    },
    mounted() {
        this.setSplashScreenState()
        this.setVisited()
    },
    beforeDestroy() {
        this.disposeVisited()
    },
    methods: {
        setSplashScreenState() {
            const display = toBoolean(GeneralsConst.DISPLAY_SPLASH_SCREEN_ONCE) || !this.hasAlreadyVisited()

            if (display) this.splashScreenState = 'beforeEnter'
            else this.onSplashScreenDone()
        },
        onSplashScreenDone() {
            this.$store.commit(MutationType.SPLASH_SCREEN_DONE, true)
            this.splashScreenState = 'leaved'
        },
        hasAlreadyVisited(): boolean {
            return !!localStorage.getItem('visited')
        },
        setVisited() {
            window.localStorage.setItem('visited', 'true')
        },
        disposeVisited() {
            window.localStorage.removeItem('visited')
        },
    },
})
</script>

<style lang="scss" module>
.splash-screen:global(#{'-enter-active'}),
.splash-screen:global(#{'-leave-active'}) {
    transition: opacity 0.3s;
}

.splash-screen:global(#{'-enter'}),
.splash-screen:global(#{'-leave-to'}) {
    opacity: 0;
}
</style>
