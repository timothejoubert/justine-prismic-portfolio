<template>
  <section class="section">
    <PrismicRichText :field="slice.primary.title" class="title" />
    <PrismicRichText :field="slice.primary.description" />
  </section>
</template>

<script>
import { getSliceComponentProps } from '@prismicio/vue/components'

export default {
  name: 'SketchBook',
  // The array passed to `getSliceComponentProps` is purely optional and acts as a visual hint for you
  props: getSliceComponentProps(['slice', 'index', 'slices', 'context']),
}
</script>

<style scoped>
.section {
    padding: 4em;
    background: #f7f7f7;
    color: #111;
    text-align: center;
}
.title {
    margin-bottom: 2em;
}
</style>