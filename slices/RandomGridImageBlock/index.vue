<template>
  <section v-if="hasMedia" :class="$style.root">
    <div v-for="(item, i) in slice.items" :key="`slice-item-${i}`">
      <PrismicImage :field="item.image" />
    </div>
  </section>
</template>

<script lang="ts">
import { getSliceComponentProps } from '@prismicio/vue/components'
import Vue from 'vue'

export default Vue.extend({
  name: 'RandomGridImageBlock',
  // The array passed to `getSliceComponentProps` is purely optional and acts as a visual hint for you
  props: getSliceComponentProps(['slice', 'index', 'slices', 'context']),
  computed: {
    hasMedia(): boolean {
      return !!this.slice.items?.length
    },
  },
})
</script>

<style lang="scss" module>
.root {
  padding: 4em;
  background: #f7f7f7;
  color: #111;
  text-align: center;
}
.title {
  margin-bottom: 2em;
}
</style>
