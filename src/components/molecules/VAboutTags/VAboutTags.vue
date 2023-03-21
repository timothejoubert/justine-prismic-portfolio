<template>
  <div :class="$style.root">
    <v-marquee content="test">
      <div :class="$style.tags">
        <v-pill v-for="(tag, i) in pageTags" :key="i" :label="tag" :class="$style.tag" />
      </div>
    </v-marquee>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'VAboutTags',
  computed: {
    pageTags(): string[] {
      return ['pageTags', 'tag 2', 'pageTags', 'tag 2', 'pageTags', 'tag 2', 'pageTags', 'tag 2']
    },
  },
})
</script>

<style lang="scss" module>
.root {
  overflow: hidden;
}
.tags {
  transform-origin: center;
}
.tag {
  margin-inline: rem(13);
}
</style>
