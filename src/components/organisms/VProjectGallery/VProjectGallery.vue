<template>
    <div :class="$style.root">
        <div :class="$style.title" class="text-h4">Gallery</div>
        <v-carousel v-model="slideIndex" :class="$style.list">
            <prismic-image v-for="(document, i) in documents" :key="i" :field="document" :class="$style.image" />
        </v-carousel>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { FilledLinkToMediaField } from '@prismicio/types/src/value/linkToMedia'

export default Vue.extend({
    name: 'VProjectGallery',
    props: {
        documents: Array as PropType<FilledLinkToMediaField[]>,
    },
    data() {
        return {
            slideIndex: 0,
        }
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
    min-height: 100vh;
    padding: rem(300) app(padding);
    margin-top: rem(400);
    isolation: isolate;

    &::after {
        position: absolute;
        z-index: -1;
        background-color: #f5f5f5;
        content: '';
        inset: #{0 calc(app(padding) * -1) 0 calc(app(padding) * -1)};
    }
}

.title {
    position: absolute;
    top: rem(100);
    opacity: 0.06;
}

.list {
    height: max(60vh, 300px);
}

.list :global(.swiper-wrapper) {
    display: flex;
    min-width: 100%;
    height: 100%;
}

.image {
    width: auto;
    height: 100%;
    flex-shrink: 0;

    &:not(:last-child) {
        padding-right: rem(60);
    }
}
</style>
