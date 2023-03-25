<template>
  <section :class="$style.root">
    <div v-if="slice.primary.title" :class="$style.title">{{ slice.primary.title }}</div>
    <prismic-rich-text :field="slice.primary.description" :class="$style.description" class="text-body-m" />
    <div v-if="contactContent" :class="$style.contact" class="text-h5" @click="onClick">
      {{ contactContent }}
    </div>
    <div v-if="socials" :class="$style.socials">
      <v-social v-for="(social, i) in socials" :key="i" :social="social" :class="$style.social" />
    </div>

    <transition name="slide-in">
      <div v-if="clipBoard" :class="$style['clip-board']">
        <div :class="$style['clip-board__content']">E-mail copié dans le presse papier</div>
      </div>
    </transition>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { getSliceComponentProps } from '@prismicio/vue/components'
import { Social } from '~/components/molecules/VSocial/VSocial.vue'

export default Vue.extend({
  name: 'ContactBlock',
  props: getSliceComponentProps(['slice', 'index', 'slices', 'context']),
  data() {
    return {
      clipBoard: false,
    }
  },
  computed: {
    socials(): Social[] | false {
      return this.slice.primary.display_socials && this.$store.state.settings.data.socials
    },
    contactContent(): null | string {
      return this.slice.primary.contact
    },
  },
  methods: {
    onClick() {
      if (!this.contactContent) return
      this.clipBoard = true

      navigator.clipboard.writeText(this.contactContent)

      setTimeout(this.disposeClipBoard, 2500)
    },
    disposeClipBoard() {
      this.clipBoard = false
    },
  },
})
</script>

<style lang="scss" module>
.root {
  position: relative;
  background: #f7f7f7;
  color: #111;
  text-align: center;
  padding-block: rem(100);
}

.title {
  margin-bottom: 2em;
}

.title,
.description,
.socials {
  &:not(&:last-child) {
    margin-bottom: rem(40);
  }
}

.description {
  margin-inline: auto;
  max-width: rem(360);
}

.contact {
  margin-bottom: rem(68);
}

.social {
  margin-inline: rem(14);
}

.clip-board {
  position: fixed;
  right: 20px;
  bottom: 20px;
  padding: rem(28) rem(42);
  border-radius: rem(10);
  background-color: color(orange);
  color: color(light);
  z-index: 102;
}

.clip-board__content {
  font-size: rem(16);
  max-width: 220px;
  text-align: left;
}
</style>
