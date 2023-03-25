<template>
  <section :class="$style.root">
    <v-link :url="internalLink">
      <prismic-image v-if="image" :field="image" :class="$style.image" />
      <div :class="$style.content">
        <div v-if="title" :class="$style.title" class="text-h4">{{ title }}</div>
        <prismic-rich-text v-if="description" :field="slice.primary.description" class="over-title-l" />
        <v-button :class="$style.cta" :label="linkLabel" theme="orange" size="l" filled />
      </div>
    </v-link>
  </section>
</template>

<script lang="ts">
import { getSliceComponentProps } from '@prismicio/vue/components'
import * as prismicT from '@prismicio/types'
import Vue from 'vue'
import { ProjectDocument } from '~/types/prismic/app-prismic'
import { isProjectDocument } from '~/utils/prismic/entity'
import NodeUid from '~/constants/node-uid'

export default Vue.extend({
  name: 'ProjectPushBlock',
  // The array passed to `getSliceComponentProps` is purely optional and acts as a visual hint for you
  props: getSliceComponentProps(['slice', 'index', 'slices', 'context']),
  data() {
    return {
      project: {} as ProjectDocument,
    }
  },
  computed: {
    projectUid(): string {
      return this.slice.primary.project.uid
    },
    title(): boolean {
      return !!this.slice.primary.title
    },
    description(): boolean {
      return !!this.slice.primary.description
    },
    internalLink(): string {
      const internalLink = this.slice.primary.project
      return isProjectDocument(internalLink) ? `/${NodeUid.PROJECT_LISTING}/${internalLink.uid}` : internalLink.uid
    },
    linkLabel(): string {
      return this.slice.primary.cta_label || 'Voir mon projet'
    },
    image(): boolean | prismicT.ImageField<never> {
      return !!this.project?.data?.thumbnail && this.project.data.thumbnail
    },
  },
  async mounted() {
    const project = await this.$prismic.api.getByUID('project', this.projectUid)
    if (project) this.project = project
  },
})
</script>

<style lang="scss" module>
.root {
  position: relative;
  overflow: hidden;
  height: calc(100vh - #{layout(padding) * 2});
  background: #f7f7f7;
  border-radius: layout(border-radius);
  margin-bottom: rem(200);

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
