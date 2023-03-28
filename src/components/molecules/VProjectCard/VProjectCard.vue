<template>
    <div :class="$style.root">
        <v-button :class="$style.counter" tag="div" filled theme="orange" size="xs">
            <template #default>
                <span :class="$style.current">{{ formatValue(index + 1) }}</span>
                <div :class="$style.length">{{ formatValue(length) }}</div>
            </template>
        </v-button>
        <PrismicImage v-if="project.thumbnail" :field="project.thumbnail" :class="$style.image" />
        <div :class="$style.body">
            <h2 :class="$style.title">{{ title }}</h2>
            <div v-if="year" :class="$style.year">{{ year }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import mixins from 'vue-typed-mixins'
import { stringDateToYear } from '~/utils/utils'
import { ProjectData } from '~/types/prismic/app-prismic'
import CarouselSlide from '~/mixins/CarouselSlide'

export default mixins(CarouselSlide).extend({
    name: 'VProjectCard',
    props: {
        project: Object as PropType<ProjectData>,
        length: Number,
        index: Number,
    },
    computed: {
        year(): number | null {
            return stringDateToYear(this.project?.date)
        },
        title(): string {
            return this.$asText(this.project.title) || 'add a project title'
        },
    },
    methods: {
        formatValue(value: number): string {
            return ('0' + (value || 0)).substr(-2)
        },
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
}

.head {
    min-height: rem(70);
    margin-left: rem(10);
}

.counter {
    position: absolute;
    top: rem(12);
    right: rem(12);
}

.current {
    font-size: rem(14);
    font-weight: 500;
}

.length {
    display: inline-block;
    font-size: rem(10);

    &::before {
        position: relative;
        content: '/';
    }
}

.body {
    margin-top: rem(12);
    opacity: 0.8;
}

.title {
    font-size: rem(16);
    text-transform: uppercase;
}

.year {
    margin-top: rem(4);
}

.image {
    width: 100%;
    min-height: 100%;
    background-color: lightgrey;
    object-fit: cover;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
</style>
