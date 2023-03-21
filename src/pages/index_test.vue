<template>
  <SliceZone :slices="page.data.slices" :components="components" />
</template>

<script>
import { components } from '~/../slices'

export default {
  async asyncData(context) {
    const page = await context.$prismic.api.getByUID('page', 'home')
    await context.store.dispatch('load')
    return {
      page,
    }
  },
  data() {
    return { components }
  },
  head() {
    return {
      title: this.$prismic.asText(this.page.data.title),
    }
  },
}
</script>
