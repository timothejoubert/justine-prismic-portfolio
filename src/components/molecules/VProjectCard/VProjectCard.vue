<template>
    <div :class="$style.root">
        <div :class="$style.head">
            <span :class="$style.counter">
                <span :class="$style.current">{{ index + 1 }} /</span>
                <span :class="$style.length">{{ length }}</span>
            </span>
            <h2>{{title}}</h2>
            <div v-if="year">{{ year }}</div>
        </div>
        <PrismicImage v-if="project.thumbnail" :field="project.thumbnail" :class="$style.image"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { stringDateToYear } from '~/utils/utils'
import {asText} from "~/utils/prismic/utils";
import {ProjectData} from "~/types/prismic/app-prismic";

export default Vue.extend({
    name: 'VProjectCard',
    props: {
        project: Object as PropType<ProjectData>,
        length: Number,
        index: Number,
    },
    computed: {
        year(): number | null {
          console.log(this.project)
            return stringDateToYear(this.project?.date)
        },
      title(): string {
          return asText(this, this.project.title) || 'add a project title'
      }
    },
    methods: {},
})
</script>

<style lang="scss" module>
.head {
    min-height: rem(70);
    margin-left: rem(10);
}

.image {
    width: 100%;
    min-height: 100%;
    object-fit: cover;
    background-color: lightgrey;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
</style>
