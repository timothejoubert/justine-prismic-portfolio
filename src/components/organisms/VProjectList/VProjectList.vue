<template>
    <div :class="$style.root">
      <h1>listing</h1>
      <h1 v-if="pageData.title">{{ pageData.title }}</h1>
      <p>find pages: {{ projects }}</p>
<!--        <v-carousel v-model="slideIndex" :options="carouselOptions" :class="$style.carousel" wrapper-tag="ul">-->
<!--            <li v-for="(project, i) in projects" :key="i" :class="$style.project">-->
<!--              <p>{{project.data.title}}</p>-->
<!--                <v-link :to="project.relativePath">-->
<!--                    <v-project-card :index="i" :project="project" :length="projects.length" :class="$style.card" />-->
<!--                </v-link>-->
<!--            </li>-->
<!--        </v-carousel>-->
    </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import { CarouselOptions } from '~/components/molecules/VCarousel/VCarousel.vue'
import PageProvider from '~/mixins/PageProvider'
import {PageDocument} from "~/types/prismic";
// import {PrismicDocument} from "@prismicio/types";
// import {PageDocumentData} from "~/types/prismic-types.generated";

export default mixins(PageProvider).extend({
    name: 'VProjectList',
    async asyncData(context) {
      const pages = await context.$prismic.api.query(
          context.$prismic.predicates.at('document.type', 'page')
      ).then(response => response.results as PageDocument[])
      // if (pages) {
        return { pages }
      // } else {
      //   error({statusCode: 404, message: 'Page not found'})
      // }
    },
    data() {
        return {
            slideIndex: 0,
        }
    },
    computed: {
        projects(): string[] {
          return this.pages?.map((page: PageDocument) => page.data.title)
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
    align-items: flex-end;
}

.project {
    width: max(300px, 25vw);
    height: 50vh;
    flex-shrink: 0;
    border-right: 1px solid black;
}

.card {
    display: flex;
    height: 100%;
    flex-direction: column;
}
</style>
