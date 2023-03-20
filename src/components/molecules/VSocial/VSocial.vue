<template>
    <v-button :label="label" size="m" outlined :href="href"  />
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'

interface ExternalLink {
  link_type: string
  url: string
}

export type Social = {
  name: string | null
  link?: ExternalLink
}

export default Vue.extend({
    name: 'VSocial',
    props: {
        social: Object as PropType<Social>,
    },
  computed: {
    label(): string {
      console.log(this.social)
      return this.social?.name || 'fallback réseaux'
    },
    href(): string | undefined {
      return this.social?.link?.url
    }
  },
})
</script>
