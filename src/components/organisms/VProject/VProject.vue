<template>
    <div :class="$style.root">
        <h1>project page</h1>
        <h1>{{ pageData.title }}</h1>
    </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import PageProvider from '~/mixins/PageProvider'

export default mixins(PageProvider).extend({
    name: 'VProject',
})
</script>

<style lang="scss" module>
.root {
    position: relative;
}
</style>
