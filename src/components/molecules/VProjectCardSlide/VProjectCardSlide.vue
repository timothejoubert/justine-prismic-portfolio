<template>
    <v-link :reference="project" :class="$style.root">
        <prismic-image v-if="project.data.thumbnail" :field="project.data.thumbnail" :class="$style.image" />
        <div :class="$style.body">
            <h2 :class="$style.title">{{ project.data.title }}</h2>
            <div v-if="project.data.year" :class="$style.year">{{ project.data.year }}</div>
        </div>
    </v-link>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { Document } from '@prismicio/client/types/documents'
import { ProjectData } from '~/types/prismic/app-prismic'

export default Vue.extend({
    name: 'VProjectCardSlide',
    props: {
        project: Object as PropType<Document<ProjectData>>,
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
}
</style>
