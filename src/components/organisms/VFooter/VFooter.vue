<template>
    <div :class="$style.root">
        <div :class="$style.copyright" class="text-body-xs">© {{ siteName }} | {{ currentYear }}</div>
        <div v-if="socials.length" :class="$style.socials">
            <a v-for="(social, i) in socials" :key="i" :href="social.url" target="_blank" :class="$style.link">
                <component :is="social.tagIcon" />
            </a>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { SettingsData } from '~/types/prismic/app-prismic'
import { getSocialsData, Social, SocialsContent } from '~/utils/get-socials-data'
import { isGroupFulled } from '~/utils/prismic/field-group'

export default Vue.extend({
    name: 'VFooter',
    computed: {
        settingsData(): SettingsData {
            return this.$store.state.settings.data
        },
        siteName(): string | null {
            return this.settingsData.site_name
        },
        socials(): SocialsContent[] {
            const prismicSocialGroup = this.settingsData.socials

            if (isGroupFulled<Social>(prismicSocialGroup)) return getSocialsData(prismicSocialGroup)

            return []
        },
        currentYear(): number {
            return new Date().getFullYear()
        },
    },
    methods: {},
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
