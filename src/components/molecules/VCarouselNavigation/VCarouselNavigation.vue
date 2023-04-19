<template>
    <div v-if="!(isFirst && isLast)" :class="$style.root">
        <v-button
            aria-label="slide précédente"
            size="s"
            :theme="theme"
            :disabled="isFirst"
            :class="$style['button--previous']"
            outlined
            @click="gotoPrevious"
        >
            <template #icon>
                <icon-arrow-left />
            </template>
        </v-button>
        <v-button aria-label="slide suivante" :theme="theme" size="s" :disabled="isLast" outlined @click="gotoNext">
            <template #icon>
                <icon-arrow-right />
            </template>
        </v-button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import IconArrowRight from '~/assets/images/icons/chevron-right.svg?sprite'
import IconArrowLeft from '~/assets/images/icons/chevron-left.svg?sprite'
import { Theme } from '~/types/app'

export default Vue.extend({
    name: 'VCarouselNavigation',
    components: { IconArrowRight, IconArrowLeft },
    props: {
        length: {
            type: Number,
            default: 1,
        },
        value: Number,
        theme: { type: String as PropType<Theme>, default: 'orange' },
    },
    computed: {
        isFirst(): boolean {
            return this.value === 0
        },
        isLast(): boolean {
            return this.value >= this.length - 1
        },
    },
    methods: {
        gotoPrevious(): void {
            if (this.isFirst) return
            this.$emit('input', this.value - 1)
        },
        gotoNext(): void {
            if (this.isLast) return
            this.$emit('input', this.value + 1)
        },
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.pagination {
    margin-right: rem(44);
}

.button--previous {
    margin-right: rem(12);
}
</style>
