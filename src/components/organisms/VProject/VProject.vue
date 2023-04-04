<template>
    <div :class="$style.root">
        <div :class="$style.head">
            <div :class="$style.medias">
                <prismic-image v-if="project.thumbnail" :field="project.thumbnail" :class="$style.image" />
            </div>

            <div :class="$style.body">
                <h1 v-if="project && project.title" :class="$style.title" class="text-h3">{{ project.title }}</h1>
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
                    v-if="project.description"
                    :class="$style.description"
                    class="text-body-s"
                    :content="project.description"
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
import Vue from 'vue'
import { FilledLinkToMediaField } from '@prismicio/types/src/value/linkToMedia'
import { ProjectData } from '~/types/prismic/app-prismic'
import { getDocumentData } from '~/utils/prismic/parse-api-data'
import { stringDateToYear } from '~/utils/utils'
import { filteredMediaGroupByKey, isGroupFulled } from '~/utils/prismic/field-group'

export default Vue.extend({
    name: 'VProject',
    computed: {
        project(): ProjectData {
            return getDocumentData<ProjectData>(this.$store.state.currentPageData)
        },
        year(): number | null {
            return stringDateToYear(this.project.date)
        },
        tagList(): string[] {
            return this.project.tags?.filter((tag) => !!tag.label).map((tag) => tag.label as string)
        },
        gallery(): FilledLinkToMediaField[] | undefined {
            if (!this.project.gallery?.length || !isGroupFulled(this.project.gallery)) return
            // @ts-ignore
            return filteredMediaGroupByKey<FilledLinkToMediaField>(this.project.gallery, 'media')
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
