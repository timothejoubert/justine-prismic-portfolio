<template>
    <div :class="$style.root">
        <v-carousel-project />
    </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import PageProvider from '~/mixins/PageProvider'

export default mixins(PageProvider).extend({
    name: 'VProjectList',
})
</script>

<style lang="scss" module>
.root {
    position: fixed;
    display: flex;
    width: 100%;
    min-height: 100vh;
    align-items: center;
}
</style>
