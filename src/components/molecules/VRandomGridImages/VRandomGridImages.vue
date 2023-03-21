<template>
  <div :class="$style.root" :style="wrapperStyle">
    <div
      v-for="(image, index) in images"
      :key="index"
      ref="image"
      :class="$style.item"
      @mouseenter="onMouseEnter(index)"
    >
      <!--            <nuxt-img :src="`/images/cul${image.src}`" :alt="image.title" :class="$style.image" />-->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getRandomFromRange } from '~/utils/utils'

type Location = [number, number]

const COLUMNS = 8
const ROWS = 7

export default Vue.extend({
  name: 'VRandomGridImages',
  data() {
    return {
      wrapperStyle: {},
      positions: [] as Location[],
      usedPositions: [] as number[],
      images: [] as any[],
    }
  },
  created() {
    this.initImages()
    this.initPositions()
  },
  mounted() {
    this.setWrapperGridSize()
    this.setImagesPosition()
    window.addEventListener('resize', this.setWrapperGridSize)
    window.addEventListener('click', this.setImagesPosition)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setWrapperGridSize)
    window.removeEventListener('click', this.setImagesPosition)
  },
  methods: {
    initImages() {
      const imagesFile = require.context('~/static/images/cul/', false, /\.png$/)
      const imageArray = Array.from(imagesFile.keys()) as string[]

      this.images = imageArray.map((fileName: string) => {
        return {
          title: "Titre de l'image",
          src: fileName.substr(1),
        }
      })
    },
    setWrapperGridSize() {
      const padding = parseInt(getComputedStyle(this.$el).padding) * 2 || 60
      const containerWidth = window.innerWidth - padding
      const containerHeight = window.innerHeight - padding

      this.wrapperStyle = {
        '--width-column': Math.floor(containerWidth / COLUMNS) + 'px',
        '--height-row': Math.floor(containerHeight / ROWS) + 'px',
      }
    },
    initPositions() {
      const coordinates: Location[] = []
      let index = 0

      for (let column = 0; column < COLUMNS + 1; column++) {
        for (let row = 0; row < ROWS; row++) {
          coordinates[index] = [column, row] as Location
          index++
        }
      }

      this.positions = coordinates
    },
    setImagesPosition() {
      const images = this.$refs.image as HTMLElement[]

      images.forEach((img: HTMLElement) => {
        this.pickRandomLocation(img)
      })
    },
    pickRandomLocation(item: HTMLElement) {
      const unusedIndex: number[] = []
      this.positions.forEach((_, positionIndex) => {
        if (!this.usedPositions[positionIndex]) {
          unusedIndex.push(positionIndex)
        }
      })

      // console.log(unusedIndex)

      const randomIndex = unusedIndex.length
        ? Math.floor(Math.random() * unusedIndex.length)
        : getRandomFromRange(0, this.positions.length)
      const selectedLocation = this.positions[randomIndex]
      this.usedPositions.push(randomIndex)

      item.style.setProperty('--x-position', (selectedLocation?.[0] || '1').toString())
      item.style.setProperty('--y-position', (selectedLocation?.[1] || '1').toString())
    },
    onMouseEnter(index: number) {
      const images = this.$refs.image as HTMLElement[]
      const selectedImage = images[index]

      this.pickRandomLocation(selectedImage)
    },
  },
})
</script>

<style lang="scss" module>
$columnWidth: var(--width-column, 140px);
$rowHeight: var(--heigth-row, 140px);

.root {
    position: fixed;
    display: grid;
    width: 100vw;
    min-width: 0;
    height: 100%;
    min-height: 0;
    padding: rem(60);
    grid-template-columns: repeat(10, minmax($columnWidth, $columnWidth));
    grid-template-rows: repeat(7, minmax($rowHeight, $rowHeight));
}

.item {
    display: flex;
    min-width: 0;
    align-items: center;
    justify-content: center;
    grid-column: var(--x-position) / span 1;
    grid-row: var(--y-position) / span 1;
}

.image {
    width: rem(100);
}
</style>
