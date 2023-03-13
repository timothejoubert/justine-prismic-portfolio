<template>
    <nav :class="rootClass" @mouseleave="onMouseLeave" @mouseenter="onMouseEnter">
        <transition :name="$style.menu" @enter="initIndicatorPosition">
            <div v-show="isMenuOpen" :class="$style.menu">
                <div ref="slider" :class="$style.slider"></div>
                <ul v-if="pages && pages.length" :class="$style.list">
                    <li
                        v-for="(page, i) in pages"
                        :key="i"
                        ref="link"
                        :class="$style.item"
                        @mouseenter="onLinkMouseEnter(page)"
                    >
                        <nuxt-link :to="page.link.uid" :class="$style.item__link">{{ page.label }}</nuxt-link>
                    </li>
                </ul>
            </div>
        </transition>

        <v-button :class="$style.button" theme="orange" filled label="menu" @click="isMenuOpen = !isMenuOpen">
            <template #icon>
                <div :class="$style.burger"></div>
            </template>
        </v-button>
    </nav>
</template>

<script lang="ts">
import { gsap } from 'gsap'
import mixins from 'vue-typed-mixins'
import ThemeProvider from '~/mixins/ThemeProvider'
import { getCSSVarFromTheme } from '~/utils/get-theme'
import { isListingPage } from '~/utils/entity'
import {MenuDocumentData, MenuDocumentDataLinksItem} from "~/types/prismic-types.generated";
import {isInternalLinkFulled} from "~/utils/prismic/prismic-guard";

export default mixins(ThemeProvider).extend({
    name: 'VNav',
    props: {
        value: Boolean,
    },
    data() {
        return {
            isMenuOpen: false,
            selectedIndex: null as null | number,
            indicatorTimeline: null as null | GSAPTimeline,
            timeoutId: -1,
        }
    },

    computed: {
        rootClass(): (undefined | false | string)[] {
            return [
                this.$style.root,
                this.isMenuOpen && this.$style['root--open'],
                typeof this.theme === 'string' && this.$style[`root--theme-${this.theme}`],
            ]
        },
        pages(): MenuDocumentDataLinksItem[] {
          return this.$store.state.navigation.data.links
        },
    },
    watch: {
        selectedIndex(newIndex: number, oldIndex: number) {
            this.updateIndicatorPosition(newIndex, oldIndex)
        },
        value(isOpen) {
            if (isOpen) this.openMenu()
            else this.closeMenu()
        },
    },
    methods: {
        onMouseLeave() {
            this.timeoutId = window.setTimeout(this.closeMenu, 100)
        },
        onMouseEnter() {
            this.openMenu()
        },
        closeMenu() {
            this.isMenuOpen = false
        },
        openMenu() {
            window.clearTimeout(this.timeoutId)
            this.timeoutId = -1
            this.isMenuOpen = true
        },
        onLinkMouseEnter(page: MenuDocumentDataLinksItem) {
          const uid = isInternalLinkFulled(page.link) ? page.link.uid : null
          if (!uid) return
          this.updateSelectedIndexByPath(uid)
        },
        updateSelectedIndexByRoute() {
          this.updateSelectedIndexByPath(this.$route.path)
        },
        updateSelectedIndexByPath(path: string) {
          const parsedPath = path[0] === '/' ? path.substring(1) : path

            this.selectedIndex = Math.max(
                this.pages?.findIndex((page) => {
                  const pageUid = isInternalLinkFulled(page.link) ? page.link.uid : null
                  if (!pageUid) return false
                  const isInProjectPage = isListingPage(page) && path.includes(pageUid)
                  return parsedPath === pageUid || isInProjectPage
                }),
                0
            )
        },
        initIndicatorPosition() {
            this.updateSelectedIndexByRoute()
            setTimeout(() => this.updateIndicatorPosition(this.selectedIndex || 0), 200)
        },
        updateIndicatorPosition(newIndex: number, oldIndex?: number) {
            const targets = this.$refs.link as HTMLElement[]
            const selectedTarget = targets?.[newIndex] || targets?.[0]
            const slider = this.$refs.slider

            if (!selectedTarget || !slider) return

            this.indicatorTimeline = gsap.timeline({ defaults: { duration: 0.4 } })
            this.indicatorTimeline.to(slider, {
                x: selectedTarget.offsetLeft - 5,
                width: selectedTarget.offsetWidth + 2,
            })

            this.resetLinkColor(targets, selectedTarget, oldIndex)
        },
        resetLinkColor(targets: HTMLElement[], selectedTarget: HTMLElement, oldIndex?: number) {
            const theme = getCSSVarFromTheme(this.theme || 'orange')

            gsap.to(selectedTarget, 0.3, { color: theme['--theme-on-default'], ease: 'none' })

            if (oldIndex) {
                gsap.to(targets[oldIndex], 0.3, { color: theme['--theme-default'], ease: 'none' })
            } else {
                const notSelectedLinks = targets.filter((_, i) => i !== this.selectedIndex)
                gsap.to(notSelectedLinks, 0.3, { color: theme['--theme-default'], ease: 'none' })
            }
        },
    },
})
</script>

<style lang="scss" module>
$height: rem(34);

.root {
    @include theme-variants;

    position: relative;
    display: flex;
    width: min-content;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
}

.menu {
    position: absolute;
    top: 0;
    margin-bottom: rem(12);
    transform: translateY(calc(-100% - 8px));
}

.list {
    display: inline-flex;
    padding: rem(4);
    border: 2px solid var(--theme-default);
    border-radius: $height;

    &::before {
        position: absolute;
        background-color: color(background);
        border-radius: $height;
        content: '';
        inset: rem(4);
    }
}

.item {
    position: relative;
    z-index: 2;
    color: var(--theme-on-default);
    white-space: nowrap;
}

.item__link {
    display: flex;
    min-width: rem(68);
    min-height: $height;
    align-items: center;
    justify-content: center;
    padding-inline: rem(22);
}

.slider {
    position: absolute;
    z-index: 1;
    background: var(--theme-default);
    border-radius: $height;
    inset: rem(4);
    pointer-events: none;
    transform-origin: center;
    user-select: none;
}

.button {
    text-transform: uppercase;
    user-select: none;
}

.burger {
    position: relative;
    display: flex;
    width: rem(12);
    height: 1px;
    align-items: center;
    justify-content: space-between;
    background-color: var(--theme-on-default);
    transition: background-color 0.2s;

    &::after,
    &::before {
        position: absolute;
        display: block;
        width: 100%;
        height: 1px;
        background-color: var(--theme-on-default);
        content: '';
        transform-origin: center;
        transition: transform 0.3s;
    }

    &::before {
        width: 80%;
        transform: translateY(4px);
    }

    &::after {
        transform: translateY(-4px);
    }

    .root--open & {
        background-color: transparent;

        &::before {
            width: 100%;
            transform: rotate(-45deg);
        }
        &::after {
            transform: rotate(45deg);
        }
    }
}

.menu:global(#{'-enter-active'}),
.menu:global(#{'-leave-active'}) {
    transition: 0.4s;
    transition-property: opacity, transform;
}

.menu:global(#{'-enter'}),
.menu:global(#{'-leave-to'}) {
    opacity: 0;
    transform: translateY(-150%);
}
</style>
