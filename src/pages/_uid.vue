<template>
    <div v-if="pageData" :class="$style.root">
        <lazy-v-home v-if="isHome" :page-data="pageData" />
        <lazy-v-sketch-books v-else-if="isSketchBook" :page-data="pageData" />
        <lazy-v-project-list v-else-if="isProjectListing" :page-data="pageData" />
        <lazy-v-about v-else-if="isAbout" :page-data="pageData" />
        <lazy-v-project v-else-if="isProjectPage" :page-data="pageData" />
        <lazy-v-default v-else :page-data="pageData" />

        <slice-zone v-if="slices" wrapper="main" :slices="slices" :components="components" :class="$style.main" />
    </div>
    <div v-else>
        <p>pageData not find</p>
    </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
// import SliceZone from '@prismicio/vue/dist/prismic-vue'
import * as prismicT from '@prismicio/types'
import { components } from '~/../slices'
import Page from '~/mixins/Page'
import { isAbout, isHomePage, isProjectListing, isSketchBooks } from '~/utils/prismic/document'
import { isProjectDocument } from '~/utils/prismic/entity'

export default mixins(Page).extend({
    data() {
        return { components }
    },
    computed: {
        isHome(): boolean {
            return !!this.page && isHomePage(this.page)
        },
        isProjectListing(): boolean {
            return !!this.page && isProjectListing(this.page)
        },
        isSketchBook(): boolean {
            return !!this.page && isSketchBooks(this.page)
        },
        isAbout(): boolean {
            return !!this.page && isAbout(this.page)
        },
        isProjectPage(): boolean {
            console.log('check project page, zehbfhzebf jzeh')
            return !!this.page && isProjectDocument(this.page)
        },
        slices(): prismicT.SliceZone | [] {
            return !!this.page && this.page.data?.slices
        },
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
    overflow: hidden;
    min-height: 100vh;
}

.main {
    @include full-width(true);

    & > *:not(:first-child) {
        margin-block: rem(200);
    }
}
</style>
