import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'

if (process.client) {
    gsap.registerPlugin(Draggable, InertiaPlugin)
}

export interface HorizontalLoopOptions extends GSAPTimelineVars {
    draggable?: boolean
    speed?: number
    onChange?(item: HTMLElement, index: number): void
}

export interface HorizontalLoopTimeline extends GSAPTimeline {
    next(): void
    previous(): void
    toIndex(index: number, vars?: GSAPTweenVars): void
    current(): number
    dispose(): void
    times(): number[]
    draggable?: Draggable
}

/**
 * @see https://greensock.com/docs/v3/HelperFunctions#loop
 * This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.
 *
 * Features:
 *  - Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
 *  - When each item animates to the left or right enough, it will loop back to the other side
 *  - Optionally pass in a config object with values like draggable: true, center: true, speed (default: 1, which travels at roughly 100 pixels per second), paused (boolean), repeat, reversed, and paddingRight.
 *  - The returned timeline will have the following methods added to it:
 *    - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
 *    - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
 *    - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
 *    - current() - returns the current index (if an animation is in-progress, it reflects the final index)
 *    - times - an Array of the times on the timeline where each element hits the "starting" spot.
 * @param items
 * @param config
 */
export function horizontalLoop(items: HTMLElement[], config: HorizontalLoopOptions): HorizontalLoopTimeline {
    items = gsap.utils.toArray(items)
    config = config || {}
    const onChange = config.onChange
    let lastIndex = 0
    const tl = gsap.timeline({
        repeat: config.repeat,
        onUpdate:
            onChange &&
            function () {
                const i = tl.closestIndex(true)
                if (lastIndex !== i) {
                    lastIndex = i

                    onChange(items[i], i)
                }
            },
        paused: config.paused,
        defaults: { ease: 'none' },
        onReverseComplete: () => {
            tl.totalTime(tl.rawTime() + tl.duration() * 100)
        },
    })
    const length = items.length
    const startX = items[0].offsetLeft
    const times: number[] = []
    const widths: number[] = []
    const spaceBefore: number[] = []
    const xPercents: number[] = []
    let curIndex = 0
    let indexIsDirty = false
    const center = config.center
    const pixelsPerSecond = (config.speed || 1) * 100
    const snap = config.snap === false ? (v: number) => v : gsap.utils.snap(config.snap || 1) // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
    let timeOffset = 0
    const container: HTMLElement =
        center === true
            ? (items[0].parentNode as HTMLElement)
            : ((gsap.utils.toArray(center)[0] || items[0].parentNode) as HTMLElement)
    let totalWidth: number
    const getTotalWidth = () =>
        items[length - 1].offsetLeft +
        (xPercents[length - 1] / 100) * widths[length - 1] -
        startX +
        spaceBefore[0] +
        items[length - 1].offsetWidth * (gsap.getProperty(items[length - 1], 'scaleX') as number) +
        (parseFloat(config.paddingRight) || 0)
    const populateWidths = () => {
        let b1 = container.getBoundingClientRect()
        let b2
        items.forEach((el, i) => {
            widths[i] = parseFloat(gsap.getProperty(el, 'width', 'px') as string)
            xPercents[i] = snap(
                (parseFloat(gsap.getProperty(el, 'x', 'px') as string) / widths[i]) * 100 +
                    (gsap.getProperty(el, 'xPercent') as number)
            )
            b2 = el.getBoundingClientRect()
            spaceBefore[i] = b2.left - (i ? b1.right : b1.left)
            b1 = b2
        })
        gsap.set(items, {
            // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
            xPercent: (i) => xPercents[i],
        })
        totalWidth = getTotalWidth()
    }
    // eslint-disable-next-line prefer-const
    let timeWrap: (value: any, target?: any) => any
    const populateOffsets = () => {
        timeOffset = center ? (tl.duration() * (container.offsetWidth / 2)) / totalWidth : 0
        center &&
            times.forEach((_t, i) => {
                times[i] = timeWrap(tl.labels['label' + i] + (tl.duration() * widths[i]) / 2 / totalWidth - timeOffset)
            })
    }
    const getClosest = (values: number[], value: number, wrap: number) => {
        let i = values.length
        let closest = 1e10
        let index = 0
        let d

        while (i--) {
            d = Math.abs(values[i] - value)
            if (d > wrap / 2) {
                d = wrap - d
            }
            if (d < closest) {
                closest = d
                index = i
            }
        }
        return index
    }
    const populateTimeline = () => {
        let i, item, curX, distanceToStart, distanceToLoop
        tl.clear()
        for (i = 0; i < length; i++) {
            item = items[i]
            curX = (xPercents[i] / 100) * widths[i]
            distanceToStart = item.offsetLeft + curX - startX
            distanceToLoop = distanceToStart + spaceBefore[0] + widths[i] * (gsap.getProperty(item, 'scaleX') as number)
            tl.to(
                item,
                {
                    xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
                    duration: distanceToLoop / pixelsPerSecond,
                },
                0
            )
                .fromTo(
                    item,
                    { xPercent: snap(((curX - distanceToLoop + totalWidth) / widths[i]) * 100) },
                    {
                        xPercent: xPercents[i],
                        duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
                        immediateRender: false,
                    },
                    distanceToLoop / pixelsPerSecond
                )
                .add('label' + i, distanceToStart / pixelsPerSecond)
            times[i] = distanceToStart / pixelsPerSecond
        }
    }
    const refresh = (deep?: boolean) => {
        const progress = tl.progress()
        tl.progress(0, true)
        populateWidths()
        deep && populateTimeline()
        populateOffsets()
        deep && tl.draggable ? tl.time(times[curIndex], true) : tl.progress(progress, true)
    }
    let proxy: HTMLElement
    const refreshCallback = () => refresh(true)
    gsap.set(items, { x: 0 })
    populateWidths()
    populateTimeline()
    populateOffsets()
    window.addEventListener('resize', refreshCallback)
    function toIndex(index: number, vars?: GSAPTweenVars) {
        vars = vars || { duration: 0.4 }
        Math.abs(index - curIndex) > length / 2 && (index += index > curIndex ? -length : length) // always go in the shortest direction
        const newIndex = gsap.utils.wrap(0, length, index)
        let time = times[newIndex]
        if (time > tl.time() !== index > curIndex && index !== curIndex) {
            // if we're wrapping the timeline's playhead, make the proper adjustments
            time += tl.duration() * (index > curIndex ? 1 : -1)
        }
        if (time < 0 || time > tl.duration()) {
            vars.modifiers = { time: timeWrap }
        }
        curIndex = newIndex
        vars.overwrite = true
        gsap.killTweensOf(proxy)
        return vars.duration === 0 ? tl.time(timeWrap(time)) : tl.tweenTo(time, vars)
    }
    tl.toIndex = (index: number, vars?: GSAPTweenVars) => toIndex(index, vars)
    tl.closestIndex = (setCurrent?: boolean) => {
        const index = getClosest(times, tl.time(), tl.duration())
        if (setCurrent) {
            curIndex = index
            indexIsDirty = false
        }
        return index
    }
    tl.current = () => (indexIsDirty ? tl.closestIndex(true) : curIndex)
    tl.next = (vars: GSAPTweenVars) => toIndex(tl.current() + 1, vars)
    tl.previous = (vars: GSAPTweenVars) => toIndex(tl.current() - 1, vars)
    tl.times = times
    tl.progress(1, true).progress(0, true) // pre-render for performance
    tl.dispose = () => {
        window.removeEventListener('resize', refreshCallback)
    }
    if (config.reversed) {
        tl.vars.onReverseComplete?.()
        tl.reverse()
    }
    if (config.draggable && typeof Draggable === 'function') {
        proxy = document.createElement('div')
        const wrap = gsap.utils.wrap(0, 1)
        let ratio: number
        let startProgress: number
        let lastSnap: number
        let initChangeX: number
        const align = () => {
            tl.progress(wrap(startProgress + (draggable.startX - draggable.x) * ratio))
        }
        const syncIndex = () => tl.closestIndex(true)
        if (typeof InertiaPlugin === 'undefined') {
            // eslint-disable-next-line no-console
            console.warn('InertiaPlugin required for momentum-based scrolling and snapping. https://greensock.com/club')
        }
        const draggable = Draggable.create(proxy, {
            trigger: items[0].parentNode as HTMLElement,
            type: 'x',
            onPressInit() {
                const x = this.x
                gsap.killTweensOf(tl)
                startProgress = tl.progress()
                refresh()
                ratio = 1 / totalWidth
                initChangeX = startProgress / -ratio - x
                gsap.set(proxy, { x: startProgress / -ratio })
            },
            onDrag: align,
            onThrowUpdate: align,
            overshootTolerance: 0,
            inertia: true,
            snap(value) {
                // note: if the user presses and releases in the middle of a throw, due to the sudden correction of proxy.x in the onPressInit(), the velocity could be very large, throwing off the snap.
                // So sense that condition and adjust for it.
                // We also need to set overshootTolerance to 0 to prevent the inertia from causing it to shoot past and come back
                if (Math.abs(startProgress / -ratio - this.x) < 10) {
                    return lastSnap + initChangeX
                }
                const time = -(value * ratio) * tl.duration()
                const wrappedTime = timeWrap(time)
                const snapTime = times[getClosest(times, wrappedTime, tl.duration())]
                let dif = snapTime - wrappedTime
                Math.abs(dif) > tl.duration() / 2 && (dif += dif < 0 ? tl.duration() : -tl.duration())
                lastSnap = (time + dif) / tl.duration() / -ratio
                return lastSnap
            },
            onRelease() {
                syncIndex()
                draggable.isThrowing && (indexIsDirty = true)
            },
            onThrowComplete: syncIndex,
        })[0]
        tl.draggable = draggable
    }
    timeWrap = gsap.utils.wrap(0, tl.duration())
    tl.closestIndex(true)
    lastIndex = curIndex
    onChange && onChange(items[curIndex], curIndex)

    return tl as HorizontalLoopTimeline
}
