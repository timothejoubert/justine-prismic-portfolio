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
import { getProjectUid } from '~/utils/prismic/project'
import { isAbout, isHomePage, isProjectListing, isSketchBooks } from '~/utils/prismic/document'
import { isProjectDocument } from '~/utils/prismic/entity'

export default Vue.extend({
    // middleware({ req, redirect }: Context) {
    //     if (!req?.url) return
    //
    //     const slugifyPath = req.url.replace(/\s+/g, '-').toLowerCase();
    //     if (slugifyPath !== req.url) return redirect(slugifyPath)
    // },
    async asyncData({ $prismic, params, store }: Context) {
        let page

        const projectUid = getProjectUid(params)
        const parameter = params?.uid || projectUid

        console.log('params', parameter, getProjectUid(params))
        console.log('fetch page in async data mixin')

        // TODO: if project => check if already store in state
        // TODO fetch data from dispatch actions

        try {
            if (parameter) page = await $prismic.api.getByUID('page', parameter)
            if (parameter && !page) page = await $prismic.api.getByUID('project', parameter)
            if (!page) page = await $prismic.api.getByUID('page', NodeUid.HOME)
        } catch (error) {
            console.log('failed on asyncData page', error)
        }

        await store.dispatch('updatePageData', page)
        console.log('current page', page)
        if (page) return { page }
        return { page: mockData }

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
