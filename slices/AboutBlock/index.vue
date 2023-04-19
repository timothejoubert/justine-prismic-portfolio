<template>
    <section :class="$style.root" class="layout--wide-background">
        <nuxt-img
            v-if="slice.primary.media"
            provider="prismic"
            :src="slice.primary.media.url"
            sizes="xs:100vw md:50vw lg:50vw vl:50vw xl:50vw xxl:50vw hd:50vw"
            :class="$style.media"
        />
        <div :class="$style.body">
            <div v-if="title" :class="$style.title" class="text-h5">{{ title }}</div>
            <v-text :class="$style.content" :content="slice.primary.content" class="text-body-l" />
            <v-button
                v-if="internalLink"
                :class="$style.cta"
                label="En savoir plus"
                theme="orange"
                size="m"
                outlined
                :to="internalLink"
            />
        </div>
    </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { getSliceComponentProps } from '@prismicio/vue/components'
import PrismicImage from '@prismicio/vue/src/components/Image'
import { isProjectDocument } from '~/utils/prismic/entity'
import NodeUid from '~/constants/node-uid'

export default Vue.extend({
    name: 'AboutBlock',
    components: { PrismicImage },
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
    --background-color: #{color(light)};

    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    background: #f7f7f7;
    padding-block: rem(150);
    max-width: rem(1000);
    gap: rem(38);
    margin-inline: auto;

    @include media('>=lg') {
        gap: rem(38) rem(68);
    }
}

.media {
    overflow: hidden;
    border-radius: app(border-radius);
    width: 100%;

    @include media('>=md') {
        width: clamp(300px, 40%, 620px);
    }
}

.body {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: rem(20);
    padding-inline: var(--layout-padding-inline);
    margin-inline: auto;

    @include media('>=md') {
        width: 50%;
    }
}

.content {
    margin-bottom: rem(28);
}
</style>
