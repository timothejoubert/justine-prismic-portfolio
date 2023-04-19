<template>
    <div :class="$style.root">
        <div :class="$style.title" class="text-h4">Gallery</div>
        <v-carousel v-model="slideIndex" :class="$style.list" async-slides>
            <template v-for="(document, i) in documents">
                <nuxt-img
                    v-if="document && document.url"
                    :key="i"
                    provider="prismic"
                    :src="document.url"
                    sizes="xs:100vw md:70vw lg:60vw vl:60vw xl:60vw xxl:60vw hd:60vw"
                    :class="$style.image"
                />
            </template>
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
        documents: {
            type: Array as PropType<FilledLinkToMediaField[]>,
            default: () => [],
        },
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
    padding: rem(300) var(--layout-padding-inline);
    margin-top: rem(400);
    isolation: isolate;

    &::after {
        position: absolute;
        z-index: -1;
        background-color: #f5f5f5;
        content: '';
        inset: 0 calc(var(--layout-padding-inline) * -1) 0 calc(var(--layout-padding-inline) * -1);
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
    object-fit: contain;

    &:not(:last-child) {
        padding-right: rem(60);
    }
}
</style>
