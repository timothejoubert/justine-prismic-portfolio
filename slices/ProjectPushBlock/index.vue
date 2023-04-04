<template>
    <section :class="$style.root">
        <v-link :reference="slice.primary.project">
            <prismic-image v-if="image" ref="image" :field="image" :class="$style.image" />
            <div :class="$style.content">
                <v-text :class="$style.title" class="text-h5" :content="slice.primary.title" />
                <v-text class="over-title-m" :content="slice.primary.description" />
                <v-button :class="$style.cta" :label="linkLabel" theme="orange" size="l" filled />
            </div>
        </v-link>
    </section>
</template>

<script lang="ts">
import { getSliceComponentProps } from '@prismicio/vue/components'
import * as prismicT from '@prismicio/types'
import Vue from 'vue'
import { Document } from '@prismicio/client/types/documents'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ProjectData } from '~/types/prismic/app-prismic'

export default Vue.extend({
    name: 'ProjectPushBlock',
    props: getSliceComponentProps(['slice', 'index', 'slices', 'context']),
    data() {
        return {
            project: {} as Document<ProjectData>,
        }
    },
    async fetch() {
        let project = this.$store.getters.getProjectByUid(this.projectUid)
        if (!project) project = await this.$prismic.api.getByUID('project', this.projectUid)

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
    },
    methods: {
        initScrollAnimation() {
            gsap.registerPlugin(ScrollTrigger)
            const root = this.$el as HTMLElement
            const image = this.$refs.image as HTMLElement

            if (!root || !image) return
            gsap.to(image, {
                scrollTrigger: {
                    markers: true,
                    trigger: root,
                    scrub: true,
                    start: 'top bottom',
                    end: 'top',
                },
                scale: 1.1,
                ease: 'none',
            })
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
        background: linear-gradient(to top, rgba(#000, 0.25), transparent 30%);
    }

    &::after {
        background: linear-gradient(to top, rgba(#000, 0), rgba(#000, 0.1));
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
    inset: inherit $space $space $space;
}

.title {
    margin-bottom: rem(15);
}

.description,
.title {
    width: clamp(#{rem(360), 40%, rem(450)});
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
