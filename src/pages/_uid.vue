<template>
    <div v-if="pageData" :class="$style.root" class="layout--fullwidth">
        <lazy-v-home v-if="isHome" />
        <lazy-v-sketch-books v-else-if="isSketchBook" />
        <lazy-v-project-list v-else-if="isProjectListing" />
        <lazy-v-about v-else-if="isAbout" />
        <lazy-v-project v-else-if="isProjectPage" />
        <lazy-v-default v-else />

        <slice-zone
            v-if="slices"
            id="main"
            wrapper="main"
            :slices="slices"
            :components="components"
            :class="$style.main"
        />
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
    name: 'page',
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
    min-height: calc(100vh - rem(68 + 28)); // footer height and margin bottom
}

.main {
    & > *:not(:first-child) {
        margin-block: rem(140);

        @include media('>=md') {
            margin-block: rem(280);
        }
    }
}
</style>
