<template>
    <section :class="$style.root">
        <v-link :reference="slice.primary.project">
            <prismic-image v-if="image" :field="image" :class="$style.image" />
            <div :class="$style.content">
                <v-text :class="$style.title" class="text-h4" :content="slice.primary.title" />
                <v-text class="over-title-l" :content="slice.primary.description" />
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
})
</script>

<style lang="scss" module>
.root {
    position: relative;
    overflow: hidden;
    height: calc(100vh - #{layout(padding) * 2});
    margin-bottom: rem(200);
    background: #f7f7f7;
    border-radius: layout(border-radius);

    &::before {
        position: absolute;
        background: linear-gradient(transparent 60%, rgba(#000, 0.15));
        content: '';
        inset: 0;
        pointer-events: none;
    }
}

.image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.content {
    $space: #{calc(layout(padding) * 1.5)};

    position: absolute;
    inset: inherit $space $space $space;
}

.title {
    margin-bottom: rem(15);
}

.description,
.title {
    width: clamp(375px, 35%, 650px);
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
