import type { MetaInfo } from 'vue-meta'
import Vue from 'vue'
import { Context } from '@nuxt/types'
import * as prismicT from '@prismicio/types'
import { FacebookMetaOptions, PageMetaPropertyName, TwitterMetaOptions } from '~/types/meta'
import { createFacebookMeta } from '~/utils/meta/facebook'
import { createTwitterMeta } from '~/utils/meta/twitter'
import { MainPageData } from '~/types/prismic/app-prismic'
import NodeUid from '~/constants/node-uid'
import mockData from '~/static/mock-data/page-data-fallback.json'
import { isAbout, isHomePage, isProjectListing, isSketchBooks } from '~/utils/prismic/document'
import { isProjectDocument } from '~/utils/prismic/entity'
import CustomType from '~/constants/custom-type'

export default Vue.extend({
    // middleware: 'slugParser',
    async asyncData({ $prismic, params, store, route }: Context) {
        let page
        const isProjectListingPage = route.path.substring(1) === NodeUid.PROJECT_LISTING
        const isProjectPath = route.path.includes(`/${NodeUid.PROJECT_LISTING}/`) && !!params?.uid
        const parameter = params?.uid || (isProjectListingPage ? NodeUid.PROJECT_LISTING : NodeUid.HOME)

        if (isProjectPath) {
            page = store.getters.getProjectByUid(parameter)
        } else {
            page = await $prismic.api.getByUID(CustomType.PAGE, parameter)
        }

        if (page) {
            await store.dispatch('updatePageData', page)
            return { page }
        } else {
            return { page: mockData }
        }
    },
    head(): MetaInfo {
        const meta = [
            {
                hid: 'description',
                name: 'description',
                content: this.pageDescription,
            } as PageMetaPropertyName,
            ...createFacebookMeta(this.getFacebookMetaOptions()),
            ...createTwitterMeta(this.getTwitterMetaOptions()),
            { hid: 'version', name: 'version', content: this.$config.version || '' },
        ]

        return {
            htmlAttrs: {
                lang: 'fr',
            },
            title: this.metaTitle,
            meta,
        }
    },
    computed: {
        pageData(): MainPageData {
            return this.page?.data
        },
        appTitle(): string {
            return this.$asText(this.$store.state.settings?.data?.site_name) || 'fallBack site name'
        },
        metaTitle(): string {
            if (this.isHome) return this.appTitle
            return `${this.$asText(this.pageData?.title) || 'fallback title'} | ${this.appTitle}`
        },
        metaImage(): string {
            const media = this.pageData?.thumbnail ? this.pageData.thumbnail : undefined
            return media?.url || '/images/share.jpg'
        },
        pageUrl(): string {
            return this.appTitle + this.$route.fullPath.substring(1)
        },
        pageDescription(): string {
            return (
                this.$asText(this.pageData?.description) ||
                this.$asText(this.$store.state.settings?.data?.description) ||
                'fallback description in page'
            )
        },
        isHome(): boolean {
            return !!this.page && isHomePage(this.page)
        },
        isProjectListing(): boolean {
            return !!this.page && isProjectListing(this.page)
        },
        isSketchBook(): boolean {
            return !!this.page && isSketchBooks(this.page)
        },
        isAbout(): boolean {
            return !!this.page && isAbout(this.page)
        },
        isProjectPage(): boolean {
            return !!this.page && isProjectDocument(this.page)
        },
        slices(): prismicT.SliceZone | [] {
            return !!this.page && this.page.data?.slices
        },
    },
    methods: {
        getTwitterMetaOptions(): TwitterMetaOptions {
            return {
                title: this.metaTitle,
                description: this.pageDescription,
                url: this.pageUrl,
                image: this.metaImage,
            }
        },
        getFacebookMetaOptions(): FacebookMetaOptions {
            return {
                siteName: this.appTitle,
                title: this.metaTitle,
                description: this.pageDescription,
                url: this.pageUrl,
                image: this.metaImage,
            }
        },
    },
})
