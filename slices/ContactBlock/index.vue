<template>
    <section :class="$style.root">
        <v-text v-if="slice.primary.title" :class="$style.title" :content="slice.primary.title" />
        <v-text
            v-if="slice.primary.description"
            :content="slice.primary.description"
            :class="$style.description"
            class="text-body-m"
        />
        <button v-if="contactContent" :class="$style.contact" class="text-h5" @click="onClick">
            {{ contactContent }}
        </button>
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
import { getSliceComponentProps } from '@prismicio/vue/components'
// import { Portal } from 'portal-vue'
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
        socials(): Social[] | false | undefined {
            return this.slice.primary.display_socials && this.$store.state.settings?.data?.socials
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
    padding-block: rem(100);
    text-align: center;
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
    max-width: rem(360);
    margin-inline: auto;
}

.contact {
    margin-bottom: rem(68);
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
    color: color(orange);
    border: 1px solid color(orange);
    border-radius: rem(10);
    background-color: color(light);

    &::before {
        position: absolute;
        background-color: color(orange);
        //content: '';
        inset: 0;
        //opacity: 0.8;
    }
}

.clip-board__content {
    position: relative;
    font-size: rem(16);
    //max-width: 220px;
    text-align: left;
}
</style>
