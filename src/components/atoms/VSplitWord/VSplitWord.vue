<script lang="ts">
import Vue from 'vue'
import type { VNode, PropType } from 'vue'
import { AnimationState } from '~/components/organisms/VSplashScreen/VSplashScreen.vue'

interface SplitWordProps {
    enabled: boolean
    content: string
    defaultHidden: boolean
    breakWord: boolean
    split: SplitItem[]
    numberOfWordInLine: number
    transitionState: AnimationState
}

type SplitItem = 'letter' | 'word' | 'line'

export default Vue.extend({
    name: 'VSplitWord',
    props: {
        split: {
            type: Array as PropType<SplitItem[]>,
            default: () => ['letter'],
        },
        numberOfWordInLine: {
            type: Number,
            default: 2,
        },
        content: String,
        enabled: { type: Boolean, default: true },
        breakWord: { type: Boolean, default: true },
        defaultHidden: { type: Boolean, default: true },
        transitionState: String as PropType<AnimationState>,
    },
    methods: {
        onAnimationEnd(state: AnimationState) {
            this.$emit('transitionend', state)
        },
    },
    render(createElement): VNode {
        const { content, defaultHidden, enabled, split, numberOfWordInLine } = this.$props as SplitWordProps

        const displayLetter = split.includes('letter')
        const displayWord = split.includes('word')
        const displayLine = split.includes('line')

        const wrapperData = {
            ...this.$data,
            class: [
                this.$style.root,
                enabled && this.$style['root--enable'],
                split.map((displayedItem: string) => this.$style['root--display-' + displayedItem]),
            ],
        }
        const slots = this.$slots && (this.$slots?.default?.[0] as VNode)

        if (!enabled)
            return ((slots || content) && createElement('div', wrapperData, [slots || content])) || createElement('')

        let indexLetter = 0

        const parsedLetters = (word: string): VNode[] => {
            const letters = word.split('')
            return letters.map((letter: string, index: number) => {
                let event = {}
                indexLetter++

                const lastLetter = letters.length - 1 === indexLetter
                if (lastLetter) {
                    event = { animationend: () => this.onAnimationEnd(this.transitionState) }
                }

                return createElement(
                    'div',
                    {
                        class: [
                            this.$style.letter,
                            defaultHidden && this.$style['letter--hide'],
                            'split-letter',
                            letter === ' ' && this.$style['letter--last'],
                            this.breakWord && this.$style['letter--break'],
                            this.transitionState === 'entering' && this.$style['letter--enter-animation'],
                            this.transitionState === 'afterEnter' && this.$style['letter--leave-animation'],
                        ],
                        style: {
                            '--index-letter-in-word': index,
                            '--index-letter-total': indexLetter,
                        } as Record<string, any>,
                        on: event,
                    },
                    letter
                )
            })
        }

        const words: string[] = content.split(' ')
        const parsedWords = (line: string): VNode[] => {
            const words = line.split(' ')
            return words.map((word: string, wordIndex: number) => {
                return createElement(
                    'div',
                    {
                        class: [this.$style.word],
                        style: { '--index-word': wordIndex } as Record<string, any>,
                    },
                    displayLetter ? parsedLetters(word) : word
                )
            })
        }

        const lineNodes = (): VNode[] => {
            const lineLength = Math.ceil(words.length / numberOfWordInLine)
            const lines = Array.from(Array(lineLength).keys()).map((count: number) => {
                const indexOfFirstWord = count * numberOfWordInLine
                return words.slice(indexOfFirstWord, indexOfFirstWord + numberOfWordInLine).join(' ')
            })

            return lines.map((line: string, lineIndex: number): VNode => {
                return createElement(
                    'div',
                    {
                        class: [this.$style.line],
                        style: { '--index-line': lineIndex } as Record<string, any>,
                    },
                    displayWord ? parsedWords(line) : displayLetter ? parsedLetters(line) : line
                )
            })
        }

        return createElement(
            'div',
            wrapperData,
            displayLine
                ? lineNodes()
                : displayWord
                ? parsedWords(content)
                : displayLetter
                ? parsedLetters(content)
                : content
        )
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
    font-family: $noi;
}

.line {
    display: inline-block;

    .root:not(.root--display-word) &::after {
        position: relative;
        display: inline-block;
        content: '\00a0';
        font-size: 2rem;
    }
}

.word {
    display: inline-block;

    &::after {
        position: relative;
        display: inline-block;
        content: '\00a0';
        font-size: 2rem;
    }
}

.letter {
    position: relative;
    display: inline-block;

    .root:not(.root--enable) & {
        display: inline;
    }

    &--hide {
        font-variation-settings: 'wght' 100;
        opacity: 0;
        transform: translateY(-50px);
    }

    &--last#{&}--break {
        display: flex;
        line-height: 0;
    }

    &--last::after {
        position: relative;
        display: inline-block;
        content: '\00a0';
        font-size: 2rem;
    }

    &--enter-animation {
        animation: enter-animation 0.8s calc(80ms * var(--index-letter-total, 1)) ease(out-quart) forwards;
    }

    &--leave-animation {
        animation: leave-animation 0.5s calc(40ms * var(--index-letter-total, 1)) ease(out-quart) backwards;
    }
}

@keyframes enter-animation {
    from {
        font-variation-settings: 'wght' 100;
        opacity: 0;
        transform: translateY(-50px);
    }
    to {
        font-variation-settings: 'wght' 900;
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes leave-animation {
    from {
        font-variation-settings: 'wght' 900;
        opacity: 1;
        transform: translateY(0);
    }
    to {
        font-variation-settings: 'wght' 100;
        opacity: 0;
        transform: translateY(-50px);
    }
}
</style>
