<template>
    <section :class="$style.root">
        <v-link :reference="slice.primary.project">
            <v-image
                v-if="image"
                ref="image"
                :prismic-image="image"
                :class="$style.image"
                sizes="xs:100vw md:95vw lg:95vw vl:95vw xl:95vw xxl:95vw hd:95vw"
            />

            <div :class="$style.content">
                <div :class="$style.content__inner" :style="{ transform: `translateY(${descriptionHeight}px)` }">
                    <v-text ref="title" :class="$style.title" class="text-h5" :content="slice.primary.title" />
                    <v-text
                        ref="description"
                        class="over-title-m"
                        :class="$style.description"
                        :content="slice.primary.description"
                    />
                </div>
                <v-button :class="$style.cta" :label="linkLabel" theme="orange" size="l" filled />
            </div>
        </v-link>
    </section>
</template>

<script lang="ts">
import { getSliceComponentProps } from '@prismicio/vue/components'
import Vue from 'vue'
import type { VueConstructor } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ImageField } from '@prismicio/types'
import { ProjectDocument } from '~/types/prismic/app-prismic'
import { getProjectByUid } from '~/utils/prismic/project'

interface Component {
    resizeObserver: null | ResizeObserver
}

export default (Vue as VueConstructor<Vue & Component>).extend({
    name: 'ProjectPushBlock',
    props: getSliceComponentProps(['slice', 'index', 'slices', 'context']),
    data() {
        return {
            descriptionHeight: 0,
        }
    },
    computed: {
        project(): ProjectDocument | undefined {
            return getProjectByUid(this.$store.state.projects, this.projectUid)
        },
        projectUid(): string {
            return this.slice.primary.project.uid
        },
        description(): boolean {
            return !!this.slice.primary.description
        },
        linkLabel(): string {
            return this.slice.primary.cta_label || 'Voir mon projet'
        },
        image(): false | ImageField {
            return !!this.project?.data?.thumbnail && this.project.data.thumbnail
        },
    },
    mounted() {
        this.initScrollAnimation()
        this.initResizeObserver()
        this.setDescriptionHeight()
    },
    beforeDestroy() {
        this.disposeResizeObserver()
    },
    methods: {
        initResizeObserver() {
            const description = (this.$refs.description as Vue | undefined)?.$el as HTMLElement
            if (!description) return

            this.resizeObserver = new ResizeObserver(() => this.setDescriptionHeight())
            this.resizeObserver.observe(description)
        },
        disposeResizeObserver() {
            this.resizeObserver?.disconnect()
            this.resizeObserver = null
        },
        initScrollAnimation() {
            gsap.registerPlugin(ScrollTrigger)
            const root = this.$el as HTMLElement
            const image = (this.$refs.image as Vue | undefined)?.$el as HTMLElement

            if (!root || !image) return

            gsap.to(image, {
                scrollTrigger: {
                    trigger: root,
                    scrub: true,
                    start: 'top bottom',
                    end: 'top',
                },
                scale: 1.12,
                ease: 'none',
            })
        },
        setDescriptionHeight() {
            const el = (this.$refs.description as Vue)?.$el
            this.descriptionHeight = el?.getBoundingClientRect()?.height
        },
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
    overflow: hidden;
    height: 40vh;
    margin-bottom: rem(200);
    background: #f7f7f7;
    border-radius: app(border-radius);

    &::before,
    &::after {
        position: absolute;
        content: '';
        inset: 0;
        pointer-events: none;
    }

    &::before {
        z-index: 1;
        background: linear-gradient(to top, rgba(#fff, 0.2), transparent 30%);
    }

    &::after {
        background: linear-gradient(to top, rgba(#000, 0), rgba(#000, 0.05));
        transition: opacity 0.6s;
    }

    &:hover::after {
        opacity: 0;
    }

    @include media('>=md') {
        height: calc(100vh - #{rem(170)});
    }
}

.image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.content {
    position: absolute;
    overflow: hidden;
    inset: inherit rem(18) rem(18) rem(18);

    @include media('>=md') {
        inset: inherit rem(32) rem(32) rem(32);
    }
}

.content__inner {
    transition: transform 0.35s ease(out-quad);

    @include media('>=md') {
        .root:hover & {
            transform: translateY(0) !important;
        }
    }
}

.description,
.title {
    width: min(100%, rem(300));

    @include media('>=md') {
        width: clamp(#{rem(360), 40%, rem(450)});
    }
}

.description {
    padding-top: rem(15);
    opacity: 0;
    transition: opacity 0.35s ease(out-quad);

    @include media('>=md') {
        .root:hover & {
            opacity: 1;
        }
    }
}

.cta {
    margin-top: rem(25);

    @include media('>=md') {
        position: absolute;
        right: 0;
        bottom: 0;
        margin-top: 0;
    }
}
</style>
