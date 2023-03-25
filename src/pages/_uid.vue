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
import { components } from '~/../slices'
import Page from '~/mixins/Page'

export default mixins(Page).extend({
  data() {
    return { components }
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
  @include full-width();

  & > * {
    margin-block: rem(200);
  }
}
</style>
