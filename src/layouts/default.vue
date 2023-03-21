<template>
  <div :class="$style.root">
    <nuxt-link to="/" :class="$style.title">
      <h1 class="text-h4">{{ siteName }}</h1>
    </nuxt-link>
    <v-nav :class="$style.nav" />
    <nuxt />
  </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import Resize from '~/mixins/Resize'
import MutationType from '~/constants/mutation-type'

export default mixins(Resize).extend({
  name: 'default',
  mounted() {
    this.$store.commit(
      MutationType.PREFERS_REDUCED_MOTION,
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
  },
  computed: {
    siteName(): string {
      return this.$store.state.settings.data.sitename
    },
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

.title {
    position: fixed;
    z-index: 101;
    top: rem(30);
    left: 50%;
    color: color(orange);
    font-family: $dida;
    transform: translateX(-50%);
}
</style>
