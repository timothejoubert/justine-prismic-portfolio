<template>
    <nav :class="rootClass" @mouseleave="onMouseLeave" @mouseenter="onMouseEnter">
        <transition :name="$style.menu" @enter="initIndicatorPosition">
            <div v-show="isMenuOpen" :class="$style.menu">
                <div ref="slider" :class="$style.slider"></div>
                <ul v-if="pages && pages.length" ref="list" :class="$style.list">
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

        <v-button :class="$style.button" theme="orange" filled :label="menuLabel" @click="isMenuOpen = !isMenuOpen">
            <template #icon>
                <div :class="$style.burger"></div>
            </template>
        </v-button>

        <!-- eslint-disable-next-line vue/no-v-html -->
        <script v-if="breadcrumbJsonldB" type="application/ld+json" v-html="breadcrumbJsonldB"></script>
    </nav>
</template>

<script lang="ts">
import { gsap } from 'gsap'
import Vue from 'vue'
import type { VueConstructor } from 'vue'
import mixins from 'vue-typed-mixins'
import { getCSSVarFromTheme } from '~/utils/get-theme'
import NodeUid from '~/constants/node-uid'
import { isHomeRoute } from '~/utils/prismic/type-check'
import { isHomePage } from '~/utils/prismic/document'
import { hasProjectByUid } from '~/utils/prismic/project'
import { getMenuLinkList } from '~/utils/prismic/parse-api-data'
import { MenuItem } from '~/types/prismic/app-prismic'
import { isInternalRelationLinkWithUidFulled } from '~/utils/prismic/field-relation'
import JsonLd from '~/mixins/JsonLd'

interface Component {
    resizeObserver: null | ResizeObserver
    listDirection: string
}

export default mixins(JsonLd, Vue as VueConstructor<Vue & Component>).extend({
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
        menuLabel(): string {
            if (this.isHome) return 'Menu'
            const currentUid = this.$route.params.uid || this.$route.fullPath.substring(1)
            const currentPage = this.pages.filter(
                (page) => isInternalRelationLinkWithUidFulled(page.link) && page.link.uid === currentUid
            )?.[0]
            return currentPage?.label || 'menu'
        },
        rootClass(): (undefined | false | string)[] {
            return [this.$style.root, this.isMenuOpen && this.$style['root--open'], this.$style['root--theme-orange']]
        },
        pages(): MenuItem[] {
            return getMenuLinkList(this.$store.state?.mainMenu)
        },
        isHome(): boolean {
            return isHomeRoute(this.$route.fullPath, this.$route.params?.uid)
        },
    },
    watch: {
        '$store.state.navDistanceFromBottom'(value: number) {
            ;(this.$el as HTMLElement).style.transform = `translate(-50%, ${value}px)`
        },
        selectedIndex(newIndex: number) {
            this.updateIndicatorPosition(newIndex)
        },
        value(isOpen) {
            if (isOpen) this.openMenu()
            else this.closeMenu()
        },
    },
    mounted() {
        this.updateLinkDirection()
        this.initResizeObserver()
    },
    beforeDestroy() {
        this.disposeResizeObserver()
    },
    methods: {
        updateLinkDirection() {
            const slider = this.$refs.slider as HTMLElement
            gsap.to(slider, { clearProps: 'transform' })

            const linkList = this.$refs.list as HTMLElement
            this.listDirection = getComputedStyle(linkList).flexDirection

            this.selectedIndex = 0
        },
        initResizeObserver() {
            const linkList = this.$refs.list as HTMLElement
            this.resizeObserver = new ResizeObserver(() => {
                const hasDirectionChanged = this.listDirection !== getComputedStyle(linkList).flexDirection
                if (hasDirectionChanged) this.updateLinkDirection()
            })
            this.resizeObserver.observe(linkList)
        },
        disposeResizeObserver() {
            this.resizeObserver?.disconnect()
            this.resizeObserver = null
        },
        pageLink(pageUid: string | undefined): string | undefined {
            if (isHomePage(pageUid)) return '/'
            if (this.$store.getters.isProjectUid(pageUid)) return '/' + NodeUid.PROJECT_LISTING + '/' + pageUid
            if (pageUid) return '/' + pageUid
            return undefined
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
            this.selectedIndex = index
        },
        updateSelectedIndexByRoute() {
            let currentPageUid = this.$route.params?.uid || this.$route.fullPath.substring(1)
            const isProjectPage = hasProjectByUid(this.$store.state.projects, currentPageUid)
            if (isProjectPage) currentPageUid = NodeUid.PROJECT_LISTING

            this.selectedIndex =
                this.pages?.findIndex((page) => {
                    return isInternalRelationLinkWithUidFulled(page.link) && page.link.uid === currentPageUid
                }) || 0
        },
        initIndicatorPosition() {
            this.updateSelectedIndexByRoute()
        },
        updateIndicatorPosition(newIndex: number) {
            const targets = this.$refs.link as HTMLElement[]
            const selectedTarget = targets[newIndex] || targets[0]
            const blurLinkList = targets.filter((target) => target !== selectedTarget)
            const slider = this.$refs.slider

            if (!selectedTarget || !slider) return

            if (this.listDirection === 'row') {
                gsap.to(slider, 0.4, {
                    x: selectedTarget.offsetLeft - 5,
                    width: selectedTarget.offsetWidth + 2,
                })
            } else {
                gsap.to(slider, 0.4, { y: selectedTarget.offsetTop - 5 })
            }

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
$height: rem(38);

.root {
    @include theme-variants;

    ---v-button-inner-height: #{rem(50)};
    ---v-button-inner-padding: 0 #{rem(30)} 0 #{rem(32)};

    position: fixed;
    z-index: 101;
    bottom: rem(28);
    left: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    transform: translateX(-50%);
}

.menu {
    position: absolute;
    top: 0;
    margin-bottom: rem(12);
    transform: translateY(calc(-100% - 8px));
}

.list {
    display: inline-flex;
    flex-direction: column;
    padding: rem(12) rem(8);
    border: 1px solid var(--theme-default);
    border-radius: rem(20);

    &::before {
        position: absolute;
        z-index: -1;
        background-color: color(light);
        border-radius: $height;
        content: '';
        inset: 0;
        //inset: rem(4);
    }

    @include media('>=md') {
        flex-direction: row;
        padding: rem(4);
        border-radius: $height;
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
    min-width: rem(230);
    min-height: $height;
    align-items: center;
    justify-content: center;
    font-size: rem(13);
    padding-inline: rem(22);

    @include media('>=md') {
        min-width: rem(68);
    }
}

.slider {
    position: absolute;
    z-index: 1;
    top: rem(4);
    right: rem(4);
    left: rem(4);
    height: $height;
    background: var(--theme-default);
    border-radius: 100vmax;
    pointer-events: none;
    transform-origin: center;
    user-select: none;

    @include media('>=md') {
        inset: rem(4);
    }
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
