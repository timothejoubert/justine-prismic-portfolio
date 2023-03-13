<template>
    <main :class="$style.root">
        <lazy-v-home v-if="isHome" :page="pageData"/>
        <lazy-v-sketch-books v-else-if="isSketchBook" :page="pageData"/>
        <lazy-v-project-list v-else-if="isProjectListing" :page="pageData"/>
        <lazy-v-about v-else-if="isAbout" :page="pageData"/>
        <lazy-v-project v-else-if="isProject" :page="pageData"/>
    </main>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import Page from '~/mixins/Page'

export default mixins(Page).extend({
    name: 'DefaultPage',
})
</script>

<style lang="scss" module>
.root {
    position: relative;
    overflow: hidden;
    height: 100vh;
}
</style>
