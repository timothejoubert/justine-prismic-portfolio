<template>
    <div :class="$style.root">
        <div :class="$style.head">
            <div :class="$style.medias">
                <nuxt-img
                    v-if="pageData && pageData.thumbnail && pageData.thumbnail.url"
                    provider="prismic"
                    :src="pageData.thumbnail.url"
                    sizes="xs:50vw md:50vw lg:50vw vl:50vw xl:50vw xxl:50vw hd:50vw"
                    :class="$style.image"
                    :placeholder="[pageData.thumbnail.dimensions.width, pageData.thumbnail.dimensions.height, 10]"
                />
            </div>

            <div :class="$style.body">
                <h1 v-if="pageData.title" :class="$style.title" class="text-h3">{{ pageData.title }}</h1>
                <div v-if="tagList && tagList.length" :class="$style.tags">
                    <v-button
                        v-for="(tag, i) in tagList"
                        :key="i"
                        tag="div"
                        size="s"
                        outlined
                        :label="tag"
                        :class="$style.tag"
                    />
                    <div v-if="year" :class="$style.year">{{ year }}</div>
                </div>
                <v-text
                    v-if="pageData.description"
                    :class="$style.description"
                    class="text-body-s"
                    :content="pageData.description"
                />
            </div>
        </div>
        <v-project-gallery :documents="gallery" />
        <div :class="$style['project-list']">
            <v-carousel-project :display-number="false" />
        </div>
    </div>
</template>

<script lang="ts">
import { FilledLinkToMediaField } from '@prismicio/types/src/value/linkToMedia'
import mixins from 'vue-typed-mixins'
import page from '../../../mixins/Page'
import { stringDateToYear } from '~/utils/utils'
import { filteredMediaGroupByKey, isGroupFulled } from '~/utils/prismic/field-group'
import PageProvider from '~/mixins/PageProvider'

export default mixins(PageProvider).extend({
    name: 'VProject',
    computed: {
        page() {
            return page
        },
        year(): number | null {
            return stringDateToYear(this.pageData.date)
        },
        tagList(): string[] {
            return this.pageData.tags?.filter((tag) => !!tag.label).map((tag) => tag.label as string)
        },
        gallery(): FilledLinkToMediaField[] | undefined {
            if (!this.pageData.gallery?.length || !isGroupFulled(this.pageData.gallery)) return
            // @ts-ignore
            return filteredMediaGroupByKey<FilledLinkToMediaField>(this.pageData.gallery, 'media')
        },
    },
})
</script>

<style lang="scss" module>
.root {
    @include full-width(true);

    position: relative;
}

.head {
    display: flex;
    flex-direction: column;

    @include media('>=md') {
        flex-direction: row;
    }
}

.medias {
    position: relative;
    left: calc(var(--layout-padding-inline) * -1);
    width: calc(100% + var(--layout-padding-inline) * 2);
    order: 2;
    margin-top: rem(62);

    @include media('>=md') {
        max-width: 50%;
        height: 100vh;
        order: unset;
        margin-top: 0;
        padding-block: rem(70);
    }
}

.image {
    overflow: hidden;
    width: 100%;
    height: 100%;
    min-height: 70vh;
    border-radius: rem(28) rem(28) 0 0;
    object-fit: cover;

    @include media('>=md') {
        border-radius: unset;
        object-fit: contain;
    }
}

.body {
    margin-top: rem(200);

    @include media('>=md') {
        width: 50%;
    }
}

.title {
    margin-bottom: rem(22);
}

.tags {
    display: flex;
    align-items: center;
    margin-bottom: rem(22);
}

.tag {
    &:not(:first-child) {
        margin-left: rem(8);
    }
}

.year {
    margin-left: rem(18);
    font-size: rem(20);
    font-style: italic;
}

.project-list {
    display: flex;
    height: 100vh;
    align-items: center;
}
</style>
