<template>
    <section :class="$style.root">
        <v-text :content="slice.primary.title" class="title" />
        <v-text :content="slice.primary.description" />
        <ul :class="$style.projects">
            <v-project-card-slide
                v-for="project in projects"
                :key="project.uid"
                :project="project"
                :class="$style.slide"
            />
        </ul>
    </section>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import { getSliceComponentProps } from '@prismicio/vue/components'
import ProjectsMutation from '~/mixins/ProjectsMutation'

export default mixins(ProjectsMutation).extend({
    name: 'ProjectListingBlock',
    props: getSliceComponentProps(['slice', 'index', 'slices', 'context']),
})
</script>

<style lang="scss" module>
.root {
    padding: 4em;
    background: #f7f7f7;
    color: #111;
    text-align: center;
}

.projects {
    display: flex;
}

.slide {
    margin-bottom: 2em;
    width: 400px;
    flex-shrink: 0;
}
</style>
