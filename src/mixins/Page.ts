import type { MetaInfo } from 'vue-meta'
import Vue from 'vue'
import { FacebookMetaOptions, PageMetaPropertyName, TwitterMetaOptions } from '~/types/meta'
import { createFacebookMeta } from '~/utils/meta/facebook'
import { createTwitterMeta } from '~/utils/meta/twitter'
import { isAbout, isProjectPage, isProjectListing, isSketchBooks } from '~/utils/prismic/entity'
import * as prismicT from "@prismicio/types";
import {MainPageData} from "~/types/prismic/app-prismic";
import NodeUid from "~/constants/node-uid";
import {Context} from "@nuxt/types";
import {isHomeRoute} from "~/utils/prismic/utils";

const MOCK_PAGE_DATA = {
    title: 'mock page data fallBackTitle',
    description: 'mock page data description ',
    type: 'mock page data default',
    slices: [],
    thumbnail: '',
}

export default Vue.extend({
    middleware({ req, redirect }: Context) {
        if (!req?.url) return

        const slugifyPath = req.url.replace(/\s+/g, '-').toLowerCase();
        if (slugifyPath !== req.url) return redirect(slugifyPath)
    },
    async asyncData ({ $prismic, params, store, $config }) {
        let page
        console.log(params?.uid)
        try {
            if (params?.uid) page = await $prismic.api.getByUID('page', params.uid)
            if (params?.uid && !page) page = await $prismic.api.getByUID('project', params.uid)
            if (!page) page = await $prismic.api.getByUID('page', NodeUid.HOME)
        } catch (error) {
            console.log('failed on asyncData page', error)
        }

        if (page) return { page }
        return  { page: MOCK_PAGE_DATA }
        // await store.dispatch('load', 'second function argument to pass in load function')
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
            console.log('pageData: ',this.page)
            return this.page?.data
        },
        appTitle(): string {
            return this.$asText(this.$store.state.settings?.data?.siteTitle) || 'fallBack site name'
        },
        metaTitle(): string {
            if (this.isHome) return this.appTitle
            return `${this.$asText(this.pageData?.title) || 'fallback title'} | ${this.appTitle}`
        },
        metaImage(): string {
            const media = !!this.pageData?.thumbnail ? this.pageData.thumbnail : undefined
            return media?.url || '/images/share.jpg'
        },
        pageUrl(): string {
            return this.appTitle + this.$route.fullPath.substring(1)
        },
        pageDescription(): string {
            return this.$asText(this.pageData?.description) || this.$asText(this.$store.state.settings?.data?.description) || 'fallback description in page'
        },
        slices(): prismicT.SliceZone | [] {
            return this.page.data?.slices
        },
        isHome(): boolean {
            return isHomeRoute(this.$route.fullPath, this.page?.uid)
        },
        isProjectListing(): boolean {
            return isProjectListing(this.page)
        },
        isSketchBook(): boolean {
            return isSketchBooks(this.page)
        },
        isAbout(): boolean {
            return isAbout(this.page)
        },
        isProjectPage(): boolean {
            return isProjectPage(this.page)
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
