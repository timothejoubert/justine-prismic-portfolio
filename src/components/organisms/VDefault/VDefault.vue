<template>
    <div :class="$style.root">
        <h1>Page default || {{ pageData.title }}</h1>
        <v-button label="label" size="xs" filled theme="orange"></v-button>
        <v-button label="label" size="s" filled theme="orange"></v-button>
        <v-button label="label" size="m" filled theme="orange"></v-button>
        <v-button label="label" size="l" filled theme="orange"></v-button>
        <v-button label="label" size="xl" filled theme="orange"></v-button>
        <v-image v-if="pageData.thumbnail" :prismic-image="pageData.thumbnail" />
    </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import PageProvider from '~/mixins/PageProvider'

export default mixins(PageProvider).extend({
    name: 'VDefault',
})
</script>

<style lang="scss" module>
.root {
    position: relative;
}
</style>
