<template>
    <v-link :reference="document" :class="[$style.root, overlapInfo && $style['root--overlap-info']]">
        <v-button v-if="displayNumber" :class="$style.counter" tag="div" filled theme="orange" size="xs">
            <template #default>
                <span :class="$style.current">{{ formatValue(index + 1) }}</span>
                <div :class="$style.length">{{ formatValue(length) }}</div>
            </template>
        </v-button>
        <nuxt-img
            v-if="project && project.thumbnail && project.thumbnail.url"
            provider="prismic"
            :src="project.thumbnail.url"
            sizes="xs:50vw md:50vw lg:50vw vl:50vw xl:50vw xxl:50vw hd:50vw"
            :class="$style.image"
        />
        <div :class="$style.body">
            <h2 :class="$style.title">{{ title }}</h2>
            <div v-if="year" :class="$style.year">{{ year }}</div>
        </div>
    </v-link>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import mixins from 'vue-typed-mixins'
import { stringDateToYear } from '~/utils/utils'
import { ProjectData, ProjectDocument } from '~/types/prismic/app-prismic'
import CarouselSlide from '~/mixins/CarouselSlide'

export default mixins(CarouselSlide).extend({
    name: 'VProjectCard',
    props: {
        document: Object as PropType<ProjectDocument>,
        length: Number,
        index: Number,
        overlapInfo: Boolean,
        displayYear: { type: Boolean, default: true },
    },
    computed: {
        project(): ProjectData {
            return this.document?.data
        },
        displayNumber(): boolean {
            return typeof this.index === 'number' && !!this.length
        },
        year(): false | number | null {
            return this.displayYear && stringDateToYear(this.project?.date)
        },
        title(): string {
            return this.$asText(this.project?.title) || 'add a project title'
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
    user-select: none;
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

    .root--overlap-info & {
        position: absolute;
        bottom: 0;
        padding: rem(18);
    }
}

.title {
    font-size: rem(16);
    text-transform: uppercase;
}

.year {
    margin-top: rem(4);
}

.image {
    display: block;
    width: 100%;
    height: var(--project-image-height);
    min-height: 100%;
    background-color: lightgrey;
    border-radius: var(--project-image-border-radius);
    object-fit: cover;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
</style>
