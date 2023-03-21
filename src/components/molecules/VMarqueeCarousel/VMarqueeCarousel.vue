<template>
  <v-carousel v-model="slideIndex" :options="carouselOptions" :class="$style.root" wrapper-tag="ul">
    <v-pill v-for="(tag, i) in tags" :key="i" :label="tag" :class="$style.tag" />
  </v-carousel>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { CarouselOptions } from '~/components/organisms/VCarousel/VCarousel.vue'

export default Vue.extend({
  name: 'VMarqueeCarousel',
  props: {
    tags: Array as PropType<String[]>,
  },
  data() {
    return {
      slideIndex: 0,
    }
  },
  computed: {
    carouselOptions(): CarouselOptions {
      return {
        freeMode: {
          enabled: true,
          sticky: true,
          momentumBounce: false,
          momentumRatio: 0.4,
        },
        mousewheel: {
          sensitivity: 1.2,
        },
        loop: true,
      }
    },
  },
})
</script>

<style lang="scss" module>
.root :global(.swiper-wrapper) {
    display: flex;
    align-items: flex-end;
}

.tag {
    flex-shrink: 0;
}
</style>
