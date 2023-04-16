<template>
    <div :class="$style.root">
        <v-carousel-loop v-model="slideIndex" :class="$style.projects" wrapper-tag="ul" async-slides>
            <li v-for="(project, i) in projects" :key="project.uid" :class="$style.project">
                <v-project-card
                    :index="i"
                    :document="project"
                    :length="projects.length"
                    :class="$style.card"
                    :display-number="displayNumber"
                />
            </li>
        </v-carousel-loop>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ProjectDocument } from '~/types/prismic/app-prismic'

export default Vue.extend({
    name: 'VCarouselProject',
    props: {
        displayNumber: { type: Boolean, default: true },
    },
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

.projects {
    gap: rem(80);
}

.project {
    width: max(500px, 25vw);
    height: 50vh;
    flex-shrink: 0;
    gap: rem(80);

    &:last-child {
        padding-right: rem(80);
    }

    &--placeholder {
        position: relative;
        background-color: #f3f1eb;

        &::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            animation: placeholder-waiting 1s infinite calc(-40ms * var(--placeholder-delay, 1)) ease(in-out-cubic);
            background-image: linear-gradient(
                to top,
                transparent 0%,
                rgba(255, 255, 255, 0.8) 10%,
                rgba(255, 255, 255, 0.8) 20%,
                transparent 30%
            );
            background-position: 0 0;
            background-size: 100% 120%;
            content: '';
        }
    }
}

.card {
    display: flex;
    height: 100%;
    flex-direction: column;
}

@keyframes placeholder-waiting {
    100% {
        background-position: 0 60vh;
    }
}
</style>
