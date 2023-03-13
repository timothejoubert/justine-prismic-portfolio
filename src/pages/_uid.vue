<template>
  <div :class="$style.root" v-if="pageData">
    <prismic-rich-text :field="pageData.title" />
    <lazy-v-home v-if="isHome" :slices="slices" />
    <lazy-v-sketch-books v-else-if="isSketchBook" :slices="slices" />
    <lazy-v-project-list v-else-if="isProjectListing" :slices="slices" />
    <lazy-v-about v-else-if="isAbout" :slices="slices" />
    <lazy-v-project v-else-if="isProjectPage" :slices="slices" />
<!--    <SliceZone :slices="page.data.slices" :components="components" />-->
  </div>
</template>

<script lang="ts">
// SliceZone is all slice in page
import { components } from '~/../slices'
import mixins from "vue-typed-mixins";
import Page from "~/mixins/Page";

export default mixins(Page).extend({
  data () {
    return { components }
  },
})
</script>

<style lang="scss" module>
.root {
  position: relative;
  overflow: hidden;
  height: 100vh;
}
</style>
