import type { MetaInfo } from 'vue-meta'
import Vue from 'vue'
import { FacebookMetaOptions, PageMetaPropertyName, TwitterMetaOptions } from '~/types/meta'
import { createFacebookMeta } from '~/utils/meta/facebook'
import { createTwitterMeta } from '~/utils/meta/twitter'
import { isAbout, isHomePage, isProjectPage, isProjectListing, isSketchBooks } from '~/utils/prismic/entity'
import * as prismicT from "@prismicio/types";
import {PageDocument} from "~/types/prismic/prismic-types.generated";
import {MainPageData, ProjectDocument} from "~/types/prismic/app-prismic";
import {asText, prismicFieldToString} from "~/utils/prismic/utils";

const MOCK_PAGE_DATA = {
    title: 'mock page data fallBackTitle',
    description: 'mock page data description ',
    type: 'mock page data default',
    slices: [],
}

export default Vue.extend({
    // middleware({ req, redirect }: Context) {
    //     if (!req?.url) return
    //
    //     const allPath = getAllPagePath()
    //     const slugifyPath = req?.url?.toLowerCase()?.replace(/\/$/, '')
    //
    //     const isNotExactly = allPath.includes(slugifyPath)
    //     const findNoMatch = !allPath.includes(req?.url)
    //
    //     if (findNoMatch && !isNotExactly) return redirect('/')
    //     if (isNotExactly) return redirect(slugifyPath)
    // },
    async asyncData ({ $prismic, params, store, $config }) {
        try {
            console.log(params?.uid)
            const page = await $prismic.api.getByUID('page', params?.uid || $config.defaultPageUid)

            if (page) return { page }
            else {
                const projectsResponse = await $prismic.api.getByUID('project', params?.uid || $config.defaultPageUid)
                // const projectsResponse = await $prismic.api.query(
                //     [
                //         $prismic.predicates.any('document.type', ['page', 'project']),
                //         $prismic.predicates.at('document.uid', params?.uid || $config.defaultPageUid)
                //     ]
                // ).then((response) => response.results)

                console.log('project response', projectsResponse)
                return { page: projectsResponse }
            }
        } catch {
            console.log('failed on asyncData page')
            return { data: {...MOCK_PAGE_DATA}}
        }

        // await store.dispatch('load')
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
            console.log('pageData: ',this.page, this.page?.data)
            return this.page?.data
        },
        appTitle(): string {
            return this.$prismic.asText(this.$store.state.settings?.data?.siteTitle || 'fallBack site name')
        },
        metaTitle(): string {
            return 'fjhebjhffjer'
            if (this.isHome) return this.appTitle
            return `${asText(this, this.pageData.title) || 'fallback title'} | ${this.appTitle}`
        },
        metaImage(): string {
            return 'fef'
            const media = !!this.pageData.thumbnail ? this.pageData.thumbnail : undefined
            return media?.url || '/images/share.jpg'
        },
        pageUrl(): string {
            return this.appTitle + this.$route.fullPath.substring(1)
        },
        pageDescription(): string {
            return asText(this, this.pageData?.description) || asText(this, this.$store.state.settings?.data?.description) || 'fallback description in page'
        },
        slices(): prismicT.SliceZone | [] {
            return this.page.data?.slices
        },
        isHome(): boolean {
            return isHomePage(this.page) || this.$route.fullPath === '/'
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
