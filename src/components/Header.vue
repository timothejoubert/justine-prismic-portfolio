<template>
    <div class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 leading-none">
      <nav>
        <ul class="flex flex-wrap gap-6 md:gap-10" v-if="links">
          <li
            v-for="(item, i) in links"
            :key="item.link.slug"
            class="font-semibold tracking-tight text-slate-800"
          >
            <prismic-link v-if="item && item.label" :field="item.link">{{ item.label }}</prismic-link>
          </li>
        </ul>
      </nav>
    </div>
</template>

<script lang="ts">
import {PropType} from "vue";
import {MainMenuDocument} from "~/types/prismic/prismic-types.generated";

export default {
  props: {
    navigation: {
      type: Object as PropType<MainMenuDocument>,
      required: true
    },
  },
  computed: {
    links(): MainMenuDocument['data']['links'] {
      return (this as any).navigation.data.links
    }
  },
}
</script>
