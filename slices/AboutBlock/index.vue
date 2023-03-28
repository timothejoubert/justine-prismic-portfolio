<template>
    <section :class="$style.root">
        <prismic-image :field="slice.primary.media" :class="$style.media" />
        <div :class="$style.content">
            <div v-if="title" :class="$style.title" class="text-h4">{{ title }}</div>
            <prismic-rich-text :class="$style.content" :field="slice.primary.content" class="text-body-l" />
            <v-button
                v-if="internalLink"
                :class="$style.cta"
                label="En savoir plus"
                theme="orange"
                size="m"
                filled
                :to="internalLink"
            />
        </div>
    </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { getSliceComponentProps } from '@prismicio/vue/components'
import { isProjectDocument } from '~/utils/prismic/entity'
import NodeUid from '~/constants/node-uid'
// import PrismicRichText from '@prismicio/vue/src/components/RichText'

export default Vue.extend({
    name: 'AboutBlock',
    // components: { PrismicRichText },
    props: getSliceComponentProps(['slice', 'index', 'slices', 'context']),
    computed: {
        title(): string | null {
            return this.slice.primary.title
        },
        internalLink(): string {
            const internalLink = this.slice.primary.link
            return isProjectDocument(internalLink)
                ? `/${NodeUid.PROJECT_LISTING}/${internalLink.uid}`
                : internalLink.uid
        },
    },
})
</script>

<style lang="scss" module>
.root {
    display: flex;
    align-items: center;
    background: #f7f7f7;
    padding-block: rem(100);
}

.media {
    overflow: hidden;
    width: clamp(400px, 40%, 620px);
    flex-shrink: 0;
    border-radius: layout(border-radius);

    @include media('>=md') {
        margin-right: layout(gutter) * 2;
    }
}

.title,
.content,
.cta {
    &:not(&:last-child) {
        margin-bottom: rem(28);
    }
}
</style>
