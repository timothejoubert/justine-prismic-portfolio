<template>
  <div :class="$style.root">
    <v-nav :class="$style.nav" />
    <nuxt />
  </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import Resize from '~/mixins/Resize'
import MutationType from "~/constants/mutation-type";

export default mixins(Resize).extend({
  name: 'default',
  mounted() {
    this.$store.commit(
        MutationType.PREFERS_REDUCED_MOTION,
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
  },
})
</script>
<style lang="scss" module>
.root {
    height: 100vh;
}

.nav {
    position: fixed;
    z-index: 101;
    bottom: rem(40);
    width: 100%;
}
</style>
