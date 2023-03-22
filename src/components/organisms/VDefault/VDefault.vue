<template>
  <div :class="$style.root">
    <h1>Page default</h1>
    <v-button label="label" size="xs" filled theme="orange"></v-button>
    <v-button label="label" size="s" filled theme="orange"></v-button>
    <v-button label="label" size="m" filled theme="orange"></v-button>
    <v-button label="label" size="l" filled theme="orange"></v-button>
    <v-button label="label" size="xl" filled theme="orange"></v-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'VDefault',
})
</script>

<style lang="scss" module>
.root {
  position: relative;
}
</style>
