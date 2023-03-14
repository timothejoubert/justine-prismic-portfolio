<template>
    <div :class="rootClass">
      <h1>Home</h1>
        <v-random-grid-images />
    </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import PageProvider from '~/mixins/PageProvider'
import type {PropType} from "vue";
import type {PageDocumentData} from "~/types/prismic-types.generated";

export default mixins(PageProvider).extend({
    name: 'VHome',
  props: {
    page: Object as PropType<PageDocumentData>,
  },
    computed: {
        rootClass(): (undefined | false | string)[] {
            return [this.$style.root]
        },
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
}
</style>
