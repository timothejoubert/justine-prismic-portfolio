<template>
    <div :class="rootClass">
        <div :class="$style.center">
            <v-split-word
                :class="[$style.title, 'text-h1']"
                :content="siteName"
                :transition-state="animationState"
                default-hidden
                @transitionend="onTransitionEnd"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { SplashScreenState } from '~/components/molecules/VSplashScreenWrapper/VSplashScreenWrapper.vue'

export type AnimationState = 'pending' | 'entering' | 'afterEnter' | 'afterLeave'

export default Vue.extend({
    name: 'VSplashScreen',
    props: {
        content: String,
        value: String as PropType<SplashScreenState>,
    },
    data() {
        return {
            animationState: 'pending' as AnimationState,
        }
    },
    computed: {
        rootClass(): (string | undefined | false)[] {
            return [
                this.$style.root,
                this.animationState === 'entering' && this.$style['root--enter-animation'],
                (this.animationState === 'afterEnter' || this.animationState === 'afterLeave') &&
                    this.$style['root--leave-animation'],
            ]
        },
        siteName(): string {
            return this.$store.state.settings?.data?.site_name || 'fallback site name in splash screen'
        },
    },
    watch: {
        value(splashState: SplashScreenState) {
            if (splashState === 'beforeEnter') this.onEnter()
        },
    },
    methods: {
        onTransitionEnd(state: AnimationState) {
            if (state === 'afterEnter') this.onLeaveFinish()
            else if (state === 'entering') this.onEnterFinish()
        },
        onEnter() {
            this.animationState = 'entering'
        },
        onEnterFinish() {
            this.animationState = 'afterEnter'
        },
        onLeaveFinish() {
            this.$emit('input', 'beforeLeaved')
            this.animationState = 'afterLeave'
        },
    },
})
</script>

<style lang="scss" module>
.root {
    position: fixed;
    z-index: 1001;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: var(--color-main);

    &::after {
        position: absolute;
        background-color: var(--color-bg);
        border-radius: app(border-radius);
        content: '';
        inset: rem(10);
        transform: scale(1);
    }

    &--enter-animation::after {
        animation: enter 1.4s ease(in-back) forwards;
    }

    &--leave-animation::after {
        animation: leave 1.2s ease(in-back) backwards;
    }
}

@keyframes enter {
    from {
        transform: scale(1);
    }
    to {
        transform: scale(0.985);
    }
}

@keyframes leave {
    from {
        transform: scale(0.985);
    }
    to {
        transform: scale(1.15);
    }
}

.center {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.title {
    margin-bottom: 40px;
    color: var(--color-main);
    text-align: center;
}
</style>
