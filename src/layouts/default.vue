<template>
  <div class="text-slate-800">
    <Header
      v-if="navigation || settings"
      :navigation="navigation"
      :settings="settings"
    />
    <v-nav />
    <nuxt />
  </div>
</template>

<script>
export default {
  computed: {
    navigation() {
      return this.$store.state.navigation
    },
    settings() {
      return this.$store.state.settings
    }
  }
}
</script>

<style>
body {
    @apply overflow-x-hidden antialiased;
}
</style>
