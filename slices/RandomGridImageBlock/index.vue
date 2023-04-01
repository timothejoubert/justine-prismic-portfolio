<template>
    <section v-if="hasMedia" :class="$style.root" :style="wrapperStyle">
        <div
            v-for="(item, i) in images"
            :key="`slice-item-${i}`"
            ref="image"
            :class="$style.item"
            @mouseenter="onMouseEnter(i)"
        >
            <prismic-image :field="item.image" :class="$style.image" />
        </div>
    </section>
</template>

<script lang="ts">
import { getSliceComponentProps } from '@prismicio/vue/components'
import Vue from 'vue'
import * as prismicT from '@prismicio/types'
import { SharedSliceVariation } from '@prismicio/types/src/value/sharedSliceVariation'
import eventBus from '~/utils/event-bus'
import eventType from '~/constants/event-type'

type Location = [number, number]

const COLUMNS = 7
const ROWS = 6
const HAS_FILLED_GRID = false

export default Vue.extend({
    name: 'RandomGridImageBlock',
    props: getSliceComponentProps(['slice']),
    data() {
        return {
            wrapperStyle: {},
            positions: [] as Location[],
            usedPositionIndexList: [] as number[],
            itemList: [] as HTMLElement[],
        }
    },
    computed: {
        hasMedia(): boolean {
            return !!this.slice.items?.length
        },
        images(): prismicT.ImageField[] {
            if (!HAS_FILLED_GRID) return (this.slice as SharedSliceVariation).items

            const currentNumber = this.slice.items.length
            const totalPosition = COLUMNS * ROWS

            const repeat = Math.floor(totalPosition / currentNumber) - 2
            const left = totalPosition % currentNumber

            const repeatable = [...Array(repeat).keys()].map(() => [...this.slice.items]).flat(2)
            const rest = [...Array(left).keys()].map((i) => this.slice.items[i])

            return [...repeatable, ...rest]
        },
    },
    created() {
        this.initPositions()
    },
    mounted() {
        this.initItemList()
        this.setWrapperGridSize()
        this.setAllImagePosition()

        eventBus.$on(eventType.RESIZE, this.setWrapperGridSize)
        this.$el.addEventListener('click', this.setAllImagePosition)
        window.addEventListener('keydown', this.setAllImagePosition)
    },
    beforeDestroy() {
        eventBus.$off(eventType.RESIZE, this.setWrapperGridSize)
        this.$el.removeEventListener('click', this.setAllImagePosition)
        window.removeEventListener('keydown', this.setAllImagePosition)
    },
    methods: {
        initItemList() {
            this.itemList = this.$refs.image as HTMLElement[]
        },
        setWrapperGridSize() {
            const padding = parseInt(getComputedStyle(this.$el).padding) * 2 || 60
            const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
            const containerWidth = window.innerWidth - scrollBarWidth - padding
            const containerHeight = window.innerHeight - padding

            this.wrapperStyle = {
                '--column-length': COLUMNS,
                '--row-length': ROWS,
                '--width-column': Math.floor(containerWidth / COLUMNS) + 'px',
                '--height-row': Math.floor(containerHeight / ROWS) + 'px',
            }
        },
        initPositions() {
            this.positions = []

            for (let column = 0; column < COLUMNS + 1; column++) {
                for (let row = 0; row < ROWS; row++) {
                    const location: Location = [column, row + 1]
                    this.positions.push(location)
                }
            }
        },
        setAllImagePosition() {
            this.usedPositionIndexList = []
            this.itemList.forEach((img: HTMLElement) => {
                this.pickRandomLocation(img)
            })
        },
        pickRandomLocation(item: HTMLElement) {
            const unusedIndex = this.getUnusedPosition()

            const isFirstImageSet = !unusedIndex.length

            const randomIndex = isFirstImageSet
                ? Math.floor(Math.random() * this.positions.length)
                : unusedIndex[Math.floor(Math.random() * unusedIndex.length)]

            const selectedLocation = this.positions[randomIndex]
            this.usedPositionIndexList.unshift(randomIndex)

            item.style.setProperty('--x-position', selectedLocation[0].toString())
            item.style.setProperty('--y-position', selectedLocation[1].toString())

            const maxUsedPositionLength = this.images.length
            if (this.usedPositionIndexList.length > maxUsedPositionLength)
                this.usedPositionIndexList.length = maxUsedPositionLength
        },
        getUnusedPosition(): number[] {
            if (!this.usedPositionIndexList?.length) return []
            const unusedIndex: number[] = []

            this.positions.forEach((_, i) => {
                const isPositionIndexIsUsed = this.usedPositionIndexList.includes(i)
                if (!isPositionIndexIsUsed) unusedIndex.push(i)
            })

            return unusedIndex
        },
        onMouseEnter(index: number) {
            const selectedImage = this.itemList[index]

            this.pickRandomLocation(selectedImage)
        },
    },
})
</script>

<style lang="scss" module>
$columnWidth: var(--width-column, 140px);
$rowHeight: var(--height-row, 140px);

.root {
    position: relative;
    left: calc(#{layout(padding) * -1});
    display: grid;
    width: calc(100% + #{layout(padding) * 2});
    height: calc(100vh - #{layout(padding) * 2});
    align-items: center;
    justify-content: center;
    padding: layout(padding);
    margin-top: layout(padding);
    grid-template-columns: repeat(var(--column-length), minmax(0, $columnWidth));
    grid-template-rows: repeat(var(--row-length), minmax(0, $rowHeight));

    //&::before {
    //    // prevent grid to remove column/row if no element inside
    //    position: absolute;
    //    z-index: -1;
    //    width: 100%;
    //    min-height: calc(100vh - #{layout(padding) * 2});
    //    background-color: #ececec;
    //    content: '';
    //    grid-column: 1 / -1;
    //    grid-row: 1 / 8;
    //}
}

.item {
    display: flex;
    align-items: center;
    justify-content: center;
    grid-column: var(--x-position) / span 1;
    grid-row: var(--y-position) / span 1;
    width: $columnWidth;
    height: $rowHeight;
}

.image {
    width: rem(90);
    user-select: none;
    opacity: 0.3;
}
</style>
