<template>
    <div :class="$style.root">
        <div class="text-body-xs">© {{ siteName }} | {{ currentYear }}</div>
        <div v-if="socials.length" :class="$style.socials">
            <a v-for="(social, i) in socials" :key="i" :href="social.url" target="_blank" :class="$style.link">
                <component :is="social.tagIcon" />
            </a>
        </div>
    </div>
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
import eventBus from '~/utils/event-bus'
import EventType from '~/constants/event-type'

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
    },
    mounted() {
        // this.$nextTick(() => {
        //     if (document.body.scrollHeight <= window.innerHeight) this.updateNavPosition()
        // })

        this.createIntersectionObserver()
    },
    watch: {
        isVisible(value: boolean) {
            if (value) {
                this.sendBottomDistance()
                document.addEventListener('scroll', this.onScroll)
            } else {
                eventBus.$emit(EventType.FOOTER_DISTANCE, 0)
                document.removeEventListener('scroll', this.onScroll)
            }
        },
        isHomePage(value: boolean) {
            if (value) {
                this.$nextTick(this.createIntersectionObserver)
            } else {
                this.disposeIntersectionObserver()
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
            this.sendBottomDistance()
        },
        sendBottomDistance() {
            const bottomOffset = Math.abs(this.$el.getBoundingClientRect().top - window.innerHeight) * -1

            eventBus.$emit(EventType.FOOTER_DISTANCE, bottomOffset)
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
    },
})
</script>

<style lang="scss" module>
.root {
    @include full-width($padding: false);

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: rem(20) rem(30);
    margin-bottom: rem(28);
    background-color: color(orange);
    border-radius: app(border-radius);
    color: color(white);
}

.socials {
    display: flex;
    align-items: center;
    gap: rem(16);
}

.link {
    display: flex;
    width: rem(28);
    opacity: 0.7;
    transition: opacity 0.3s;

    @media (hover: hover) {
        &:hover {
            opacity: 1;
        }
    }

    & svg {
        width: 100%;
        height: auto;
    }
}
</style>
