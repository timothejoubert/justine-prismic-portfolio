<template>
  <div :class="$style.root">
    <p v-if="$fetchState.pending">Fetching Projects...</p>

    <template v-if="projects && projects.length">
      <v-carousel
        v-model="slideIndex"
        async-slides
        :options="carouselOptions"
        :class="$style.carousel"
        wrapper-tag="ul"
      >
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
.carousel {
  position: relative;
  display: flex;
  overflow: hidden;
  min-width: 100%;
  height: 100%;
}

.root :global(.swiper-wrapper) {
  display: flex;
  align-items: center;
}

.project {
  width: max(300px, 25vw);
  height: 50vh;
  flex-shrink: 0;
  //border-right: 1px solid rgba(#000, 0.1);
}

.card {
  display: flex;
  height: 100%;
  flex-direction: column;
}
</style>
