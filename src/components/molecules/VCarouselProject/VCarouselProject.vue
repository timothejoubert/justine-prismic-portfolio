<template>
    <div :class="$style.root">
        <div v-if="$fetchState.pending" :class="$style.projects">
            <div
                v-for="i in 6"
                :key="'placeholder-' + i"
                :class="[$style.project, $style['project--placeholder']]"
                :style="{ '--placeholder-delay': i }"
            ></div>
        </div>
        <template v-else>
            <v-carousel-loop v-model="slideIndex" :class="$style.projects" async-slides>
                <li v-for="(project, i) in projects" :key="project.uid" :class="$style.project">
                    <v-link :reference="project">
                        <v-project-card
                            :index="i"
                            :project="project.data"
                            :length="projects.length"
                            :class="$style.card"
                            :display-number="displayNumber"
                        />
                    </v-link>
                </li>
            </v-carousel-loop>
        </template>
    </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import ProjectsMutation from '~/mixins/ProjectsMutation'

export default mixins(ProjectsMutation).extend({
    name: 'VCarouselProject',
    props: {
        displayNumber: { type: Boolean, default: true },
    },
    data() {
        return {
            slideIndex: 0,
        }
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
