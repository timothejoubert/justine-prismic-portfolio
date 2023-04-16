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
                        @mouseenter="onLinkMouseEnter(i)"
                    >
                        <component
                            :is="page.link.uid ? 'nuxt-link' : 'span'"
                            :to="pageLink(page.link.uid)"
                            :class="$style.item__link"
                            >{{ page.label }}
                        </component>
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
import Vue from 'vue'
import { getCSSVarFromTheme } from '~/utils/get-theme'
import NodeUid from '~/constants/node-uid'
import { isHomeRoute } from '~/utils/prismic/type-check'
import { isHomePage } from '~/utils/prismic/document'
import { getProjectUid } from '~/utils/prismic/project'
import { getRelationLinkUid } from '~/utils/prismic/field-relation'
import { getMenuLinkList } from '~/utils/prismic/parse-api-data'
import { MenuItem } from '~/types/prismic/app-prismic'

export default Vue.extend({
    name: 'VNav',
    props: {
        value: Boolean,
    },
    data() {
        return {
            isMenuOpen: false,
            selectedIndex: null as null | number,
            timeoutId: -1,
        }
    },
    computed: {
        rootClass(): (undefined | false | string)[] {
            return [this.$style.root, this.isMenuOpen && this.$style['root--open'], this.$style['root--theme-orange']]
        },
        pages(): MenuItem[] {
            return getMenuLinkList(this.$store.state.mainMenu)
        },
        isHome(): boolean {
            return isHomeRoute(this.$route.fullPath, this.$route.params?.uid)
        },
    },
    watch: {
        selectedIndex(newIndex: number) {
            this.updateIndicatorPosition(newIndex)
        },
        value(isOpen) {
            if (isOpen) this.openMenu()
            else this.closeMenu()
        },
    },
    methods: {
        pageLink(pageUid: string): string {
            if (isHomePage(pageUid)) return '/'
            if (this.$store.getters.isProjectUid(pageUid)) return '/' + NodeUid.PROJECT_LISTING + '/' + pageUid
            return '/' + pageUid
        },
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
        onLinkMouseEnter(index: number) {
            this.updateSelectedIndex(index)
        },
        updateSelectedIndexByRoute() {
            const projectUid = getProjectUid(this.$route.params)
            const currentPageUid = this.$route.params?.uid || (projectUid ? NodeUid.PROJECT_LISTING : NodeUid.HOME)

            const pageIndex = this.pages?.findIndex((page) => {
                return getRelationLinkUid(page.link) === currentPageUid
            })

            this.updateSelectedIndex(pageIndex)
        },
        updateSelectedIndex(index: number) {
            this.selectedIndex = index
        },
        initIndicatorPosition() {
            this.updateSelectedIndexByRoute()
            setTimeout(() => this.updateIndicatorPosition(this.selectedIndex || 0), 200)
        },
        updateIndicatorPosition(newIndex: number) {
            const targets = this.$refs.link as HTMLElement[]
            const selectedTarget = targets[newIndex] || targets[0]
            const blurLinkList = targets.filter((target) => target !== selectedTarget)
            const slider = this.$refs.slider

            if (!selectedTarget || !slider) return

            gsap.to(slider, 0.4, {
                x: selectedTarget.offsetLeft - 5,
                width: selectedTarget.offsetWidth + 2,
            })

            this.resetLinkColor(selectedTarget, blurLinkList)
        },
        resetLinkColor(selectedTarget: HTMLElement, blurLinkList: HTMLElement[]) {
            const theme = getCSSVarFromTheme('orange')

            gsap.to(selectedTarget, 0.3, { color: theme['--theme-on-default'], ease: 'none' })
            gsap.to(blurLinkList, 0.3, { color: theme['--theme-default'], ease: 'none' })
        },
    },
})
</script>

<style lang="scss" module>
$height: rem(34);

.root {
    @include theme-variants;

    display: flex;
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
    border: 1px solid var(--theme-default);
    border-radius: $height;

    &::before {
        position: absolute;
        background-color: color(light);
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
    font-size: rem(12);
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
