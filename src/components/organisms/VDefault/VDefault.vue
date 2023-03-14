<template>
  <div :class="$style.root">
    <h1>Page default</h1>
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
