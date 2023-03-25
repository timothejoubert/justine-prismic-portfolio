<template>
  <div :class="$style.root">
    <!--    <template v-if="splashScreenState !== 'hidden'">-->
    <!--      <transition name="splash-screen">-->
    <!--        <v-splash-screen v-if="splashScreenState !== 'done'" v-model="splashScreenState" :content="siteName" />-->
    <!--      </transition>-->
    <!--    </template>-->

    <nuxt-link to="/" :class="$style.title">
      <h1 :class="$style.logo">{{ siteName }}</h1>
    </nuxt-link>

    <v-nav :class="$style.nav" />

    <!--    <nuxt-img :class="$style.texture" provider="static" src="/images/texture.png" />-->
    <nuxt-picture
      provider="static"
      sizes="sm:480 md:768 lg:1024"
      width="1673"
      height="1109"
      src="/images/texture.png"
      :class="$style.texture"
      :img-attrs="{ class: $style['texture__image'] }"
    />

    <Nuxt />
  </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import Resize from '~/mixins/Resize'
import MutationType from '~/constants/mutation-type'
import SplashScreen from '~/mixins/SplashScreen'

export default mixins(Resize, SplashScreen).extend({
  name: 'default',
  mounted() {
    this.$store.commit(
      MutationType.PREFERS_REDUCED_MOTION,
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
  },
  computed: {
    siteName(): string {
      return this.$store.state.settings.data.site_name
    },
  },
})
</script>
<style lang="scss" module>
.root {
  height: 100vh;
}

.nav {
  position: fixed;
  z-index: 101;
  bottom: rem(20);
  left: 50%;
  transform: translateX(-50%);
}

.title {
  position: fixed;
  z-index: 101;
  top: rem(40);
  left: 50%;
  transform: translateX(-50%);
}

.logo {
  font-size: rem(22);
  color: color(orange);
  font-family: $dida;
  font-weight: 300;
}

.texture {
  position: fixed;
  overflow: hidden;
  border-radius: rem(40);
  inset: rem(20);
}

.texture__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
