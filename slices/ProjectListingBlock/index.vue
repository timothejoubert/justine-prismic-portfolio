<template>
    <section :class="$style.root">
        <v-text v-if="slice.primary.title" :content="slice.primary.title" :class="$style.title" />
        <v-text
            v-if="slice.primary.description"
            :content="slice.primary.description"
            :class="$style.description"
            class="text-body-s"
        />
        <v-carousel-navigation v-model="slideIndex" :length="projects.length - 1" :class="$style.navigation" />
        <v-carousel
            v-if="projects && projects.length"
            v-model="slideIndex"
            :class="$style.projects"
            wrapper-tag="ul"
            async-slides
        >
            <v-project-card
                v-for="project in projects"
                :key="project.uid"
                :document="project"
                :class="$style.slide"
                overlap-info
            />
        </v-carousel>
    </section>
</template>

<script lang="ts">
import { getSliceComponentProps } from '@prismicio/vue/components'
import Vue from 'vue'
import { ProjectDocument } from '~/types/prismic/app-prismic'

export default Vue.extend({
    name: 'ProjectListingBlock',
    props: getSliceComponentProps(['slice', 'index', 'slices', 'context']),
    data() {
        return {
            slideIndex: 0,
        }
    },
    computed: {
        projects(): ProjectDocument[] {
            return this.$store.state.projects
        },
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
}

.title {
    @include text-h4;

    & > * {
        font-size: inherit;
        font-weight: inherit;
    }
}

.title,
.description {
    width: clamp(320px, 60%, 600px);
}

.description {
    margin-top: rem(24);
}

.navigation {
    & > button {
        ---v-button-inner-min-width: 54px !important;
    }

    float: right;
    transform: translateY(-100%);
}

.projects {
    display: flex;
    margin-top: rem(42);
}

.slide {
    --project-image-height: 100%;
    --project-image-border-radius: #{app(border-radius)};

    width: max(38vw, 340px);
    aspect-ratio: 8 / 10;

    &:not(:last-child) {
        margin-right: app(gutter);
    }
}
</style>
