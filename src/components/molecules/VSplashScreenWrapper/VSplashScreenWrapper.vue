<template>
    <div v-if="isDisplayed" :class="[$style.root, isDisplayed && $style['root--displayed']]">
        <transition :name="$style['splash-screen']">
            <v-splash-screen v-if="splashScreenState !== 'done'" v-model="splashScreenState" />
        </transition>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import toBoolean from '~/utils/to-boolean'
import GeneralsConst from '~/constants/app'
import MutationType from '~/constants/mutation-type'

export type SplashScreenState = 'pending' | 'hidden' | 'beforeEnter' | 'beforeLeaved' | 'done'

export default Vue.extend({
    name: 'VSplashScreenWrapper',
    data() {
        return {
            splashScreenState: 'pending' as SplashScreenState,
            isReady: false,
        }
    },
    computed: {
        isDisplayed(): boolean {
            return this.splashScreenState !== 'hidden'
        },
    },
    watch: {
        splashScreenState(currentState: SplashScreenState) {
            if (currentState === 'beforeLeaved' || (currentState === 'hidden' && this.hasAlreadyVisited()))
                this.onSplashScreenDone()
        },
    },
    mounted() {
        this.setSplashScreenState()

        this.initVisited()
    },
    beforeDestroy() {
        this.unvisited()
    },
    methods: {
        setSplashScreenState() {
            const hide =
                !toBoolean(GeneralsConst.DISPLAY_ALWAYS_SPLASH_SCREEN) &&
                !toBoolean(GeneralsConst.DISPLAY_SPLASH_SCREEN_ONCE)

            const display =
                toBoolean(GeneralsConst.DISPLAY_ALWAYS_SPLASH_SCREEN) ||
                (toBoolean(GeneralsConst.DISPLAY_SPLASH_SCREEN_ONCE) && !this.hasAlreadyVisited())

            if (hide) this.splashScreenState = 'hidden'
            else if (display) this.splashScreenState = 'beforeEnter'
            else this.splashScreenState = 'done'
        },
        hasAlreadyVisited(): boolean {
            return !!localStorage.getItem('visited')
        },
        initVisited() {
            window.localStorage.setItem('visited', 'true')
        },
        unvisited() {
            window.localStorage.removeItem('visited')
        },
        onSplashScreenDone() {
            console.log('onSplashScreenDone')
            this.isReady = true
            this.splashScreenState = 'done'
            this.$store.commit(MutationType.SPLASH_SCREEN_DONE, true)
        },
    },
})
</script>

<style lang="scss" module>
.root {
    display: none;

    &--displayed {
        display: block;
    }
}

.splash-screen:global(#{'-enter-active'}),
.splash-screen:global(#{'-leave-active'}) {
    //transition-delay: 1s;
    transition-duration: 2s;
    transition-property: opacity;
}

.splash-screen:global(#{'-enter'}),
.splash-screen:global(#{'-leave-to'}) {
    opacity: 0;
}
</style>
