<template>
    <footer :class="$style.root">
        <div class="text-body-xs" :class="$style.copyright">
            © {{ siteName }} | {{ currentYear }}
            <div :class="$style.creator">
                <span> Créée par </span>
                <a href="https://timothejoubert.com" target="_blank">Timothé J.</a>
            </div>
        </div>
        <div v-if="socials.length" :class="$style.socials">
            <a v-for="(social, i) in socials" :key="i" :href="social.url" target="_blank" :class="$style.link">
                <component :is="social.tagIcon" />
            </a>
        </div>
    </footer>
</template>

<script lang="ts">
import Vue from 'vue'
import type { VueConstructor } from 'vue'
import mixins from 'vue-typed-mixins'
import { SettingsData } from '~/types/prismic/app-prismic'
import { getSocialsData, Social, SocialsContent } from '~/utils/get-socials-data'
import { isGroupFulled } from '~/utils/prismic/field-group'
import { isHomePage } from '~/utils/prismic/document'
import { isHomePath } from '~/utils/route-path'
import MutationType from '~/constants/mutation-type'

interface Component {
    intersectionObserver: null | IntersectionObserver
}

export default mixins(Vue as VueConstructor<Vue & Component>).extend({
    name: 'VFooter',
    data() {
        return {
            isVisible: false,
        }
    },
    beforeDestroy() {
        this.disposeIntersectionObserver()
        this.resetNavPosition()
        document.removeEventListener('scroll', this.onScroll)
    },
    mounted() {
        this.createIntersectionObserver()
    },
    watch: {
        isVisible(value: boolean) {
            if (value) {
                this.updateNavPosition()
                document.addEventListener('scroll', this.onScroll)
            } else {
                this.resetNavPosition()
                document.removeEventListener('scroll', this.onScroll)
            }
        },
    },
    computed: {
        settingsData(): SettingsData {
            return this.$store.state.settings?.data || { data: null }
        },
        siteName(): string | null {
            return this.settingsData?.site_name
        },
        socials(): SocialsContent[] {
            const prismicSocialGroup = this.settingsData?.socials

            if (prismicSocialGroup && isGroupFulled<Social>(prismicSocialGroup))
                return getSocialsData(prismicSocialGroup)

            return []
        },
        currentYear(): number {
            return new Date().getFullYear()
        },
        isHomePage(): boolean {
            return isHomePage(this.$store.state.currentPageData) || isHomePath(this.$route)
        },
    },
    methods: {
        onScroll() {
            this.updateNavPosition()
        },
        createIntersectionObserver() {
            this.intersectionObserver = new IntersectionObserver(this.onIntersectionObserverChange)
            this.intersectionObserver.observe(this.$el)
        },
        onIntersectionObserverChange([entry]: IntersectionObserverEntry[]) {
            this.isVisible = entry.isIntersecting
        },
        disposeIntersectionObserver() {
            this.intersectionObserver?.disconnect()
            this.intersectionObserver = null
        },
        updateNavPosition() {
            if (!this.isVisible) {
                this.resetNavPosition()
                return
            }

            const bottomOffset = Math.abs(this.$el.getBoundingClientRect().top - window.innerHeight) * -1
            this.$store.commit(MutationType.NAV_DISTANCE_FROM_BOTTOM, bottomOffset)
        },
        resetNavPosition() {
            this.$store.commit(MutationType.NAV_DISTANCE_FROM_BOTTOM, 0)
        },
    },
})
</script>

<style lang="scss" module>
.root {
    @include full-width($padding: false);

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding: rem(36) rem(30) rem(20);
    margin-bottom: rem(22);
    background-color: color(orange);
    border-radius: app(border-radius);
    color: color(white);

    @include media('>=md') {
        justify-content: space-between;
        padding-block: rem(8);
    }
}

.copyright {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @include media('>=xs') {
        flex-direction: row;
    }
}

.creator {
    margin-top: rem(6);

    & > * {
        opacity: 0.7;
    }

    & > *:first-child {
        margin-left: rem(18);
    }

    & > a {
        transition: opacity 0.3s;
    }

    & > a:hover {
        opacity: 1;
    }

    @include media('>=xs') {
        margin-top: 0;
    }
}

.socials {
    display: flex;
    align-items: center;
    gap: rem(16);
    margin-top: rem(15);

    @include media('<md') {
        width: 100%;
        flex-shrink: 0;
        justify-content: center;
    }

    @include media('>=xs') {
        margin-top: 0;
    }
}

.link {
    display: flex;
    padding: rem(4);
    opacity: 0.7;
    transition: opacity 0.3s;

    & svg {
        width: rem(28);
        height: auto;
    }

    @media (hover: hover) {
        &:hover {
            opacity: 1;
        }
    }
}
</style>
