<template>
    <section :class="$style.root">
        <v-link :reference="slice.primary.project">
            <prismic-image v-if="image" ref="image" :field="image" :class="$style.image" />
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
import * as prismicT from '@prismicio/types'
import Vue from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ProjectDocument } from '~/types/prismic/app-prismic'
import { getProjectByUid } from '~/utils/prismic/project'

export default Vue.extend({
    name: 'ProjectPushBlock',
    props: getSliceComponentProps(['slice', 'index', 'slices', 'context']),
    data() {
        return {
            project: {} as ProjectDocument,
            descriptionHeight: 0,
        }
    },
    async fetch() {
        let project = getProjectByUid(this.$store.state.projects, this.projectUid)
        if (!project) project = (await this.$prismic.api.getByUID('project', this.projectUid)) as ProjectDocument

        if (project) this.project = project
    },
    computed: {
        projectUid(): string {
            return this.slice.primary.project.uid
        },
        description(): boolean {
            return !!this.slice.primary.description
        },
        linkLabel(): string {
            return this.slice.primary.cta_label || 'Voir mon projet'
        },
        image(): boolean | prismicT.ImageField<never> {
            return !!this.project?.data?.thumbnail && this.project.data.thumbnail
        },
    },
    mounted() {
        this.initScrollAnimation()
        this.setDescriptionHeight()
    },
    methods: {
        initScrollAnimation() {
            gsap.registerPlugin(ScrollTrigger)
            const root = this.$el as HTMLElement
            const image = this.$refs.image as HTMLElement

            if (!root || !image) return
            gsap.to(image, {
                scrollTrigger: {
                    markers: false,
                    trigger: root,
                    scrub: true,
                    start: 'top bottom',
                    end: 'top',
                },
                scale: 1.15,
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
    height: calc(100vh - #{rem(170)});
    margin-bottom: rem(200);
    background: #f7f7f7;
    border-radius: app(border-radius);
    margin-inline: app(gutter);

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
}

.image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.content {
    $space: #{calc(app(padding) * 1)};

    position: absolute;
    overflow: hidden;
    inset: inherit $space $space $space;
}

.content__inner {
    transition: transform 0.35s ease(out-quad);

    .root:hover & {
        transform: translateY(0) !important;
    }
}

.description,
.title {
    width: clamp(#{rem(360), 40%, rem(450)});
}

.description {
    padding-top: rem(15);
    opacity: 0;
    transition: opacity 0.35s ease(out-quad);

    .root:hover & {
        opacity: 1;
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
