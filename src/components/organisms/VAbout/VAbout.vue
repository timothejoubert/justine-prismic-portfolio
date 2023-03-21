<template>
  <div :class="$style.root">
    <PrismicImage :field="pageData.thumbnail" :class="$style.image"/>

    <v-about-tags :class="$style.tags" />
    <!--        <v-marquee-carousel :tags="tags"/>-->

    <div :class="$style.left">

      <PrismicRichText
        v-if="settingsData.description"
        class="text-h3"
        :class="$style.tagline"
        :field="settingsData.tagline"
      />

      <PrismicRichText class="text-h4" :class="$style.content" :field="pageData.description" />

      <div :class="$style.socials">
        <v-social v-for="(social, i) in socials" :key="i" :social="social" />
      </div>


    </div>
  </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import PageProvider from '~/mixins/PageProvider'
import ProjectsMutation from '~/mixins/ProjectsMutation'

export default mixins(PageProvider, ProjectsMutation).extend({
  name: 'VAbout',
  computed: {
    settingsData() {
      return this.$store.state.settings.data
    },
    socials() {
      console.log(this.pageData.thumbnail)

      return this.settingsData.socials
    },
    tags(): string[] {
      const tagGroup = this.projects.map((project) => project.data.tags).flat(2)

      const labelList = tagGroup
        .filter((tagGroup) => {
          return !!tagGroup?.label
        })
        .map((tagGroup) => tagGroup.label) as string[]

      return [...new Set(labelList)]
    },
  },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
}

.tags {
    position: fixed;
    top: rem(65);
    left: rem(-30);
    transform: rotate(-4deg);
    transform-origin: center;
}

.tagline {
    margin-bottom: rem(30);
}

.left {
    max-width: rem(700);
    margin-top: 35vh;
    margin-left: 8vw;
}

.content {
    margin-bottom: rem(60);
}

.socials {
    display: flex;
    flex-wrap: wrap;
    gap: rem(15);
}

.image {
  position: fixed;
  right: 0;
  bottom: 0;
  width: 55%;
  height: 100vh;
  opacity: 0.1;
  object-fit: cover;
}
</style>
