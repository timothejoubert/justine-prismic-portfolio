<template>
    <div :class="$style.root"></div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import PageProvider from '~/mixins/PageProvider'

export default mixins(PageProvider).extend({
    name: 'VSketchBooks',
})
</script>

<style lang="scss" module>
.root {
    position: relative;
}
</style>
