<template>
    <div :class="$style.root">
        <v-carousel v-if="documentList.length" ref="carousel" v-model="slideIndex" :class="$style.carousel">
            <div
                v-for="(media, index) in documentList"
                :key="index"
                :class="[$style.slide, slideIndex === index && $style['slide--active']]"
            >
                <nuxt-img
                    ref="medias"
                    provider="prismic"
                    :src="media.url"
                    sizes="xs:90vw md:90vw lg:90vw vl:90vw xl:90vw xxl:90vw hd:90vw"
                    :class="$style.media"
                    :placeholder="[media.dimensions.width, media.dimensions.height, 10]"
                />
            </div>
        </v-carousel>

        <div :class="$style.bottom">
            <transition :name="$style['fade-description']" mode="out-in">
                <div v-if="description" :key="`content-${slideIndex}`" :class="[$style.description, 'text-body-xs']">
                    {{ description }}
                </div>
            </transition>
            <div v-if="documentList.length" :class="$style.pagination">
                <span :class="$style.current" class="text-body-s">{{ slideIndex + 1 }}</span>
                <span :class="$style.total" class="text-body-xs">
                    {{ documentList.length }}
                </span>
            </div>
        </div>

        <v-button
            aria-label="image précédente"
            size="m"
            :disabled="isFirst"
            :class="[$style.nav, $style['nav--previous']]"
            theme="orange"
            filled
            @click="gotoPrevious"
        >
            <template #icon>
                <icon-arrow-left />
            </template>
        </v-button>
        <v-button
            aria-label="image suivante"
            size="m"
            theme="orange"
            filled
            :disabled="isLast"
            :class="[$style.nav, $style['nav--next']]"
            @click="gotoNext"
        >
            <template #icon>
                <icon-arrow-right />
            </template>
        </v-button>

        <v-button
            aria-label="fermer le"
            size="s"
            :class="[$style.nav, $style['nav--close']]"
            theme="orange"
            outlined
            @click="close"
        >
            <template #icon>
                <icon-cross />
            </template>
        </v-button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import * as prismicT from '@prismicio/types'
import IconCross from '~/assets/images/icons/cross.svg?sprite'
import IconArrowRight from '~/assets/images/icons/arrow-right.svg?sprite'
import IconArrowLeft from '~/assets/images/icons/arrow-left.svg?sprite'

export default Vue.extend({
    name: 'VMediaViewer',
    components: { IconCross, IconArrowRight, IconArrowLeft },
    data() {
        return {
            slideIndex: 0,
        }
    },
    computed: {
        documentList(): prismicT.ImageField[] {
            return this.$store.state.mediaViewerData.map((media: prismicT.ImageField, _index: number) => {
                return media
            })
        },
        description(): string | undefined {
            return this.documentList?.[this.slideIndex]?.alt || 'fallback de description'
        },
        isFirst(): boolean {
            return this.slideIndex === 0
        },
        isLast(): boolean {
            return this.slideIndex >= this.documentList.length - 1
        },
    },
    created() {
        this.slideIndex = this.$store.state?.mediaViewerSlideIndex || 0
    },
    mounted() {
        window.addEventListener('keyup', this.onKeyUp)
    },
    beforeDestroy() {
        window.removeEventListener('keyup', this.onKeyUp)
    },
    methods: {
        onKeyUp(event: KeyboardEvent) {
            if (event.key === 'Escape') this.close()
            else if (event.key === 'ArrowLeft') this.gotoPrevious()
            else if (event.key === 'ArrowRight') this.gotoNext()
        },
        gotoPrevious(): void {
            if (this.isFirst) return
            this.slideIndex--
        },
        gotoNext(): void {
            if (this.isLast) return
            this.slideIndex++
        },
        close() {
            this.$emit('close')
        },
    },
})
</script>

<style lang="scss" module>
$space-bottom: rem(86);

.root {
    position: fixed;
    z-index: 100;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: color(white);
    color: color(dark);
    inset: 0;
}

.close {
    position: absolute;
    z-index: 1;
    top: var(--layout-padding-inline);
    right: var(--layout-padding-inline);
}

.carousel {
    overflow: hidden;
    height: calc(100% - $space-bottom);

    @include media('>=md') {
        padding-top: var(--gutter);
    }
}

.carousel :global(.swiper-wrapper) {
    display: flex;
    height: 100%;
}

.slide {
    position: relative;
    display: flex;
    width: 100vw;
    flex-direction: column;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    user-select: none;
}

.media {
    width: 100%;
    height: 100%;
    object-fit: contain;

    & img {
        -webkit-user-drag: none;
        user-select: none;
    }

    @include media('>=md') {
        max-width: 80%;
    }
}

.bottom {
    position: absolute;
    right: 0;
    bottom: 0;
    display: flex;
    width: 100%;
    height: $space-bottom;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--layout-padding-inline);
}

.description {
    max-width: rem(550);
    padding-right: rem(30);

    @include media('>=md') {
        padding-right: 0;
        text-align: center;
    }
}

.pagination {
    padding: rem(8) rem(18);
    background-color: rgba(#fff, 0.15);
    border-radius: rem(48);
}

.total {
    position: relative;

    &::before {
        position: relative;
        content: '/';
    }
}

.nav {
    position: absolute;

    &--previous {
        left: var(--layout-padding-inline);
    }

    &--close {
        top: var(--layout-padding-inline);
        right: var(--layout-padding-inline);
    }

    &--next {
        right: var(--layout-padding-inline);
    }
}

.fade-description {
    &:global(#{'-enter-active'}),
    &:global(#{'-leave-active'}) {
        transition: 0.2s ease(out-quad);
        transition-property: opacity, transform;
    }

    &:global(#{'-enter'}),
    &:global(#{'-leave-to'}) {
        opacity: 0;
        transform: translateY(8px);
    }
}
</style>
