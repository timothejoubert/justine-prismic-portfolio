<template>
    <section :class="$style.root">
        <v-text v-if="slice.primary.title" :class="$style.title" class="text-body-m" :content="slice.primary.title" />
        <v-text
            v-if="slice.primary.description"
            :content="slice.primary.description"
            :class="$style.description"
            class="text-body-s"
        />
        <div :class="$style.contact">
            <nuxt-picture
                v-for="(hand, handIndex) in handImageData"
                :key="hand + '-' + handIndex"
                provider="static"
                :width="hand.width"
                :height="hand.height"
                :src="`/images/hands/${hand.name}`"
                :class="[$style.hand, $style[`hand-${handIndex + 1}`]]"
                :img-attrs="{ class: $style['hand__img'] }"
            />
            <button v-if="contactContent" :class="$style.mail" class="text-h5" @click="onClick">
                {{ contactContent }}
            </button>
        </div>
        <div v-if="socials" :class="$style.socials">
            <v-social v-for="(social, i) in socials" :key="i" :social="social" :class="$style.social" />
        </div>

        <client-only>
            <transition name="slide-in">
                <div v-show="clipBoard" :class="$style['clip-board']">
                    <div :class="$style['clip-board__content']">E-mail copié dans le presse papier 🎉</div>
                </div>
            </transition>
        </client-only>
    </section>
</template>

<script lang="ts">
import Vue from 'vue'
import type { VueConstructor } from 'vue'
import { getSliceComponentProps } from '@prismicio/vue/components'
import { Social } from '~/components/molecules/VSocial/VSocial.vue'

const HAND_IMAGE_DATA = [
    {
        name: 'hand-1.png',
        width: '164',
        height: '143',
    },
    {
        name: 'hand-2.png',
        width: '150',
        height: '146',
    },
    {
        name: 'hand-3.png',
        width: '69',
        height: '109',
    },
    {
        name: 'hand-4.png',
        width: '90',
        height: '166',
    },
    {
        name: 'hand-5.png',
        width: '140',
        height: '184',
    },
]

interface Component {
    handImageData: typeof HAND_IMAGE_DATA
}

export default (Vue as VueConstructor<Vue & Component>).extend({
    name: 'ContactBlock',
    props: getSliceComponentProps(['slice', 'index', 'slices', 'context']),
    data() {
        return {
            clipBoard: false,
        }
    },
    computed: {
        socials(): Social[] | false | undefined {
            return this.slice.primary.display_socials && this.$store.state.settings?.data?.socials
        },
        contactContent(): null | string {
            return this.slice.primary.contact
        },
    },
    created() {
        this.handImageData = HAND_IMAGE_DATA
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
    padding-block: rem(100);
    text-align: center;
}

.title {
    margin-bottom: 2em;
}

.title {
    margin-bottom: rem(40);
}

.description {
    max-width: rem(360);
    margin-inline: auto;

    & * {
        font-size: inherit;
        font-weight: inherit;
    }
}

.contact {
    position: relative;
    display: flex;
    width: fit-content;
    justify-content: center;
    margin: rem(92) auto rem(118);
}

.mail {
    position: relative;
}

.hand {
    position: absolute;
    width: 60px;
    height: auto;
    mix-blend-mode: multiply;
    opacity: 0;
    pointer-events: none;
    transition: transform 0.5s ease(in-quad), opacity 0.4s ease(out-quad);
    user-select: none;

    &-1 {
        right: 0;
        transform: rotate(25deg);
        transform-origin: bottom right;
    }

    &-2 {
        left: 0;
        transform: rotate(30deg);
    }

    &-3 {
    }

    &-4 {
        top: -20px;
        left: 0;
    }

    &-5 {
        right: 0;
    }

    @media (hover: hover) {
        .contact:hover & {
            opacity: 0.8;
            transition: transform 0.4s ease(out-quad), opacity 0.35s ease(in-quad);
        }

        .contact:hover &-1 {
            transform: translate(-38px, 85px) rotate(40deg);
            transition-delay: 0.13s;
        }

        .contact:hover &-2 {
            transform: translate(-60px, 60px) rotate(0);
            transition-delay: 0.08s;
        }

        .contact:hover &-3 {
            transform: translate(0, 70px);
            transition-delay: 0.2s;
        }

        .contact:hover &-4 {
            transform: translate(-60px, -75px) rotate(30deg);
            transition-delay: 0.02s;
        }

        .contact:hover &-5 {
            transform: translate(20px, -85px) rotate(20deg);
            transition-delay: 0.06s;
        }
    }
}

.hand__img {
    height: auto;
}

.social {
    margin-inline: rem(14);
}

.clip-board {
    position: fixed;
    z-index: 102;
    right: 20px;
    bottom: 20px;
    padding: rem(22) rem(36);
    border: 1px solid color(orange);
    background-color: color(light);
    border-radius: rem(10);
    color: color(orange);
}

.clip-board__content {
    position: relative;
    font-size: rem(16);
    text-align: left;
}
</style>
