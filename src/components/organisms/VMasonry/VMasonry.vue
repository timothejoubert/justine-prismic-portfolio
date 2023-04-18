<script lang="ts">
import Vue from 'vue'
import type { VNode, VueConstructor } from 'vue'
import { throttle } from 'throttle-debounce'
import VMasonryItem from '~/components/organisms/VMasonry/VMasonryItem.vue'

type ItemInstance = InstanceType<typeof VMasonryItem>

export interface Inject {
    registerMasonryItem(item: ItemInstance): void

    unregisterMasonryItem(item: ItemInstance): void
}

interface MasonryItem {
    height: number
    y: number
}

interface Component {
    resizeObserver?: ResizeObserver | null
}

export default (Vue as VueConstructor<Vue & Component>).extend({
    name: 'VMasonry',
    provide(): Inject {
        return {
            registerMasonryItem: this.registerItem,
            unregisterMasonryItem: this.unregisterItem,
        }
    },
    props: {
        enabled: Boolean,
        columnNumber: Number,
    },
    data() {
        return {
            items: [] as ItemInstance[],
            inlineStyle: null as string | null,
            itemInlineStyles: [] as string[],
        }
    },
    watch: {
        enabled() {
            if (this.enabled) {
                this.initResizeObserver()
                this.updateLayout()
            } else {
                this.disposeResizeObserver()
                this.clearLayout()
            }
        },
    },
    mounted() {
        if (this.enabled) {
            this.initResizeObserver()
            this.updateLayout()
        }
    },
    beforeDestroy() {
        this.items.length = 0

        this.disposeResizeObserver()
    },
    methods: {
        initResizeObserver() {
            if (!this.$el) return

            this.resizeObserver = new ResizeObserver(throttle(100, this.updateLayout))
            this.resizeObserver.observe(this.$el)
        },
        disposeResizeObserver() {
            if (!this.resizeObserver) return

            this.resizeObserver.disconnect()
            this.resizeObserver = null
        },
        registerItem(item: ItemInstance) {
            this.items.push(item)
        },
        unregisterItem(item: ItemInstance) {
            const index = this.items.indexOf(item)

            if (index !== -1) {
                this.items.splice(index, 1)
                this.itemInlineStyles.splice(index, 1)
            }
        },
        storeInlineStyles() {
            if (this.inlineStyle === null) {
                const style = (this.$el as HTMLElement).style

                this.inlineStyle = (style && style.cssText) || ''
            }

            this.items.forEach((item, index) => {
                if (typeof this.itemInlineStyles[index] === 'undefined') {
                    const style = (item.$el as HTMLElement).style

                    this.itemInlineStyles[index] = (style && style.cssText) || ''
                }
            })
        },
        updateLayout() {
            this.storeInlineStyles()
            this.clearLayout()

            const container = this.$el as HTMLElement
            const grid: MasonryItem[][] = []
            const items = this.items.filter((item) => item.$el instanceof HTMLElement)
            const rects: DOMRect[] = items.map((item) => item.$el.getBoundingClientRect())
            const numberColumns = this.columnNumber || [...new Set(rects.map((rect) => rect.x))].length
            const isCSSGrid = getComputedStyle(container).display === 'grid'

            this.$emit('container-width', rects[this.columnNumber].x + rects[this.columnNumber].width)

            let containerHeight = 0
            let rowIndex = -1

            items.forEach((item, index) => {
                const element = item.$el as HTMLElement
                const rect = rects[index]
                const marginTop = parseFloat(getComputedStyle(element).marginTop) || 0
                const columnIndex = index % numberColumns

                let row: MasonryItem[]

                if (!columnIndex) {
                    row = []
                    rowIndex++

                    grid.push(row)
                } else {
                    row = grid[rowIndex]
                }

                const previousItem = grid[rowIndex - 1]?.[columnIndex]
                const y = item.fixed
                    ? window.scrollY + rect.y
                    : (previousItem ? previousItem.y + previousItem.height : 0) + marginTop

                row[columnIndex] = { y, height: rect.height }

                if (!item.fixed) {
                    element.style.position = 'absolute'
                    element.style.top = y + 'px'
                    element.style.left = 0 + 'px' // fix Firefox
                    element.style.width = rect.width + 'px'
                    element.style.height = rect.height + 'px'
                    element.style.marginTop = '0'

                    if (!isCSSGrid) {
                        element.style.left = rects[columnIndex].x + 'px'
                        element.style.marginLeft = '0'
                    }
                }

                if (y + rect.height > containerHeight) containerHeight = y + rect.height
            })

            container.style.height = containerHeight + 'px'
        },
        clearLayout() {
            const container = this.$el as HTMLElement

            this.items.forEach((item, index) => {
                const style = (item.$el as HTMLElement).style

                if (style) style.cssText = this.itemInlineStyles[index] || ''
            })

            container.style.cssText = this.inlineStyle || ''
        },
    },
    render(createElement): VNode {
        return this.$slots.default?.[0] || createElement('')
    },
})
</script>
