<template>
  <div :class="$style.root">
    <div v-if="$fetchState.pending" :class="$style['projects-placeholder']">
      <div v-for="i in 6" :key="'placeholder-' + i" :class="$style.project" :style="{ '--placeholder-delay': i }"></div>
    </div>
    <template v-else>
      <v-carousel v-model="slideIndex" async-slides :options="carouselOptions" :class="$style.list" wrapper-tag="ul">
        <li v-for="(project, i) in projectsData" :key="project.uid" :class="$style.project">
          <v-link :to="getProjectUrl(project.uid)">
            <v-project-card :index="i" :project="project" :length="projects.length" :class="$style.card" />
          </v-link>
        </li>
      </v-carousel>
    </template>
  </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import { CarouselOptions } from '~/components/organisms/VCarousel/VCarousel.vue'
import PageProvider from '~/mixins/PageProvider'
import ProjectsMutation from '~/mixins/ProjectsMutation'
import { ProjectData } from '~/types/prismic/app-prismic'
import NodeUid from '~/constants/node-uid'

export default mixins(PageProvider, ProjectsMutation).extend({
  name: 'VProjectList',
  data() {
    return {
      slideIndex: 0,
    }
  },
  computed: {
    hasProject(): boolean {
      return !!this.projects?.length
    },
    projectsData(): (ProjectData & { uid: string })[] {
      return this.projects.map((project) => {
        return {
          ...project.data,
          uid: project.uid,
        }
      })
    },
    carouselOptions(): CarouselOptions {
      return {
        freeMode: {
          enabled: true,
          sticky: true,
          momentumBounce: false,
          momentumRatio: 0.4,
        },
        mousewheel: {
          sensitivity: 1.2,
        },
        loop: true,
      }
    },
  },
  methods: {
    getProjectUrl(uid: string) {
      return `/${NodeUid.PROJECT_LISTING}/${uid}`
    },
  },
})
</script>

<style lang="scss" module>
.root {
    position: fixed;
    width: 100%;
    height: 100vh;
}

.projects-placeholder,
.list {
    position: relative;
    display: flex;
    overflow: hidden;
    min-width: 100%;
    height: 100%;
}

.projects-placeholder {
    align-items: center;
}

.root :global(.swiper-wrapper) {
    display: flex;
    align-items: center;
}

.project {
    width: max(300px, 25vw);
    height: 50vh;
    flex-shrink: 0;

    .projects-placeholder & {
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
