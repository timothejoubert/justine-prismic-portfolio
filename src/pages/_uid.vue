<template>
  <div :class="$style.root" v-if="pageData">
    <lazy-v-home v-if="isHome" :slices="slices" :page-data="pageData"/>
    <lazy-v-sketch-books v-else-if="isSketchBook" :slices="slices" :page-data="pageData"/>
    <lazy-v-project-list v-else-if="isProjectListing" :slices="slices" :page-data="pageData"/>
    <lazy-v-about v-else-if="isAbout" :slices="slices" :page-data="pageData"/>
    <lazy-v-project v-else-if="isProjectPage" :slices="slices" :page-data="pageData"/>
    <lazy-v-default v-else :slices="slices" :page-data="pageData"/>

<!--    <SliceZone :slices="page.data.slices" :components="components" />-->
  </div>
  <div v-else>
    <p>pageData not find</p>
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
