<template>
    <component :is="tag" v-if="typeof content === 'string'">{{ content }}</component>
    <prismic-rich-text v-else-if="content" :field="content" />
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import * as prismicT from '@prismicio/types'
// import { Component } from 'vue/types/options'

export default Vue.extend({
    name: 'VText',
    props: {
        tag: { type: String, default: 'div' },
        content: [String, Array] as PropType<String | prismicT.RichTextField>,
    },
})
</script>
