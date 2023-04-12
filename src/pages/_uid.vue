<template>
    <div v-if="pageData" :class="$style.root">
        <lazy-v-home v-if="isHome" />
        <lazy-v-sketch-books v-else-if="isSketchBook" />
        <lazy-v-project-list v-else-if="isProjectListing" />
        <lazy-v-about v-else-if="isAbout" />
        <lazy-v-project v-else-if="isProjectPage" />
        <lazy-v-default v-else />

        <slice-zone v-if="slices" wrapper="main" :slices="slices" :components="components" :class="$style.main" />
    </div>
    <div v-else>
        <p>pageData not find</p>
    </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import { SliceZone } from '@prismicio/vue/src/components/SliceZone'
import { components } from '~~/slices'
import Page from '~/mixins/Page'

export default mixins(Page).extend({
    components: { SliceZone },
    data() {
        return { components }
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
    overflow: hidden;
    min-height: 100vh;
}

.main {
    @include full-width(true);

    & > *:not(:first-child) {
        margin-block: rem(200);
    }
}
</style>
