<template>
  <div :class="rootClass">
    <h1 v-if="pageData && pageData.title">{{ pageData.title }}</h1>
    <!--        <v-random-grid-images />-->
  </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import type { PropType } from 'vue'
import PageProvider from '~/mixins/PageProvider'
import { MainPageData } from '~/types/prismic/app-prismic'

export default mixins(PageProvider).extend({
  name: 'VHome',
  props: {
    page: Object as PropType<MainPageData>,
  },
  computed: {
    rootClass(): (undefined | false | string)[] {
      return [this.$style.root]
    },
  },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
}
</style>
