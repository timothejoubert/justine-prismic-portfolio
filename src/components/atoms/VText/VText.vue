<template>
    <component :is="tag" v-if="typeof content === 'string'">{{ content }}</component>
    <prismic-rich-text v-else-if="content" :field="content" />
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import * as prismicT from '@prismicio/types'

export default Vue.extend({
    name: 'VText',
    // functional: true,
    props: {
        tag: { type: String, default: 'div' },
        content: [String, Array] as PropType<String | prismicT.RichTextField[]>,
    },
})
</script>
