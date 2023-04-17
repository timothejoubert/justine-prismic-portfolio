<template>
    <div :class="$style.root">
        <v-button
            ref="cta"
            label="Découvrir mes illustrations"
            outlined
            theme="orange"
            :class="$style.cta"
            @click="onClick"
        >
            <template #icon>
                <icon-chevron-down />
            </template>
        </v-button>
    </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import Vue from 'vue'
import PageProvider from '~/mixins/PageProvider'
import IconChevronDown from '~/assets/images/icons/chevron-down.svg?sprite'

export default mixins(PageProvider).extend({
    name: 'VHome',
    components: { IconChevronDown },
    mounted() {
        document.addEventListener('scroll', this.onScroll)
    },
    beforeDestroy() {
        document.removeEventListener('scroll', this.onScroll)
    },
    methods: {
        onScroll(_event: Event) {
            const cta = (this.$refs.cta as Vue)?.$el
            if (window.scrollY > 40) {
                cta?.classList.add(this.$style['cta--hide'])
            } else {
                cta?.classList.remove(this.$style['cta--hide'])
            }
        },
        onClick() {
            window.scrollTo({
                top: window.innerHeight,
                left: 0,
                behavior: 'smooth',
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    pointer-events: none;
}

.cta {
    ---v-button-icon-margin: 6px;

    position: absolute;
    top: 60vh;
    pointer-events: auto;
    transition: opacity 0.4s;

    &--hide {
        opacity: 0;
        pointer-events: none;
        user-select: none;
    }

    & > span {
        background-color: color(light);
    }
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
