<template>
    <div :class="$style.root">
        <div :class="$style.head">
            <div :class="$style.medias">
                <prismic-image v-if="pageData.thumbnail" :field="pageData.thumbnail" :class="$style.image" />
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
import { stringDateToYear } from '~/utils/utils'
import { filteredMediaGroupByKey, isGroupFulled } from '~/utils/prismic/field-group'
import PageProvider from '~/mixins/PageProvider'

export default mixins(PageProvider).extend({
    name: 'VProject',
    computed: {
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
}

.medias {
    position: relative;
    left: calc(#{app(gutter) * -1});
    max-width: 50%;
    height: 100vh;
}

.image {
    height: 100%;
    object-fit: contain;
}

.body {
    width: 50%;
    margin-top: rem(200);
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
