<template>
  <SliceZone :slices="page.data.slices" :components="components" />
</template>

<script>
import { components } from '~/../../slices'

export default {
  async asyncData ({ $prismic, params, store }) {
    const page = await $prismic.api.getByUID('page', params.uid)
    await store.dispatch('load')
    if (page) {
      return { page }
    } else {
      return { data: { title: 'fallBackTitle'}}
    }
  },
  data () {
    return { components }
  },
  head () {
    return {
      title: `${this.$prismic.asText(this.page?.data?.title || '')} | ${this.$prismic.asText(this.$store.state.settings?.data?.siteTitle || '')}`
    }
  }
}
</script>
