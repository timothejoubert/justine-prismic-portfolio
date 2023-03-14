<template>
    <div :class="$style.root">
        <v-marquee content="test">
            <div :class="$style.tags">
                <v-pill v-for="(tag, i) in pageTags" :key="i" :label="tag" :class="$style.tag" />
            </div>
        </v-marquee>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { PageDocument } from "~/types/prismic";
import * as prismicT from "@prismicio/types";
import {PageDocumentDataTagsItem} from "~/types/prismic-types.generated";

export default Vue.extend({
    name: 'VAboutTags',
    computed: {
        pageTags(): string[] {
          const pageTags = this.$store.state.projects
              ?.filter((project: PageDocument) => !!project.data.tags?.length)
              ?.map((project: PageDocument) => (project.data.tags as PageDocument['tags']).map((tag) => (tag as unknown as PageDocumentDataTagsItem)?.name ))
          console.log(pageTags)
            return pageTags
        },
    },
})
</script>

<style lang="scss" module>
.root {
    overflow: hidden;
}
.tags {
    transform-origin: center;
}
.tag {
    margin-inline: rem(13);
}
</style>
