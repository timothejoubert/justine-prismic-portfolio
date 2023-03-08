import type { MetaInfo } from 'vue-meta'
import Vue from 'vue'
// import { Context } from '@nuxt/types'
import { FacebookMetaOptions, PageMetaPropertyName, TwitterMetaOptions } from '~/types/meta'
import { createFacebookMeta } from '~/utils/meta/facebook'
import { createTwitterMeta } from '~/utils/meta/twitter'
import { getAllPagePath, getAppTitle } from '~/utils/parse-api-data'
import { isAbout, isHomePage, isProject, isProjectListing, isSketchBooks } from '~/utils/entity'
import { PageDocumentData } from '~/types/prismic-types.generated'
import {LinkToMediaField} from "@prismicio/types/src/value/linkToMedia";
import * as prismicT from "@prismicio/types";

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
    async asyncData ({ $prismic, params, store }) {
        const page = await $prismic.api.getByUID('page', params.uid)
        await store.dispatch('load')
        if (page) {
            return { page }
        } else {
            console.log("don\'t find page date in mixin Page")
            return {
                data: {
                    title: 'fallBackTitle',
                    description: '',
                    type: 'default',
                    parent: {},
                    tags: null,
                    slices: [],
                }
            }
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
        pageData(): PageDocumentData {
            return this.page?.data
        },
        appTitle(): string {
            return ''
            // return this.$prismic.asText(this.$store.state.settings?.data?.siteTitle || 'fallBack site name')
        },
        metaTitle(): string {
            return ''
            // const pageTitle = this.$prismic.asText(this.pageData?.title || 'fallBack title page')
            // return `${pageTitle} | ${this.appTitle}`
        },
        metaImage(): string {
            return '/images/share.jpg'
            // const media = !!this.pageData.thumbnail ? this.pageData.thumbnail as LinkToMediaField<"filled"> : undefined
            // return media?.url || '/images/share.jpg'
        },
        pageUrl(): string {
            return ''
            // return this.appTitle + this.$route.fullPath.substring(1)
        },
        pageDescription(): string {
            return ''
            // return this.$prismic.asText(this.pageData?.description || '') || this.$prismic.asText(this.$store.state.settings?.data?.description)
        },
        slices(): prismicT.SliceZone {
            return []
            // return this.pageData?.slices
        },
        isHome(): boolean {
            return isHomePage(this.pageData)
        },
        isProjectListing(): boolean {
            return isProjectListing(this.pageData)
        },
        isSketchBook(): boolean {
            return isSketchBooks(this.pageData)
        },
        isAbout(): boolean {
            return isAbout(this.pageData)
        },
        isProject(): boolean {
            return isProject(this.pageData)
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
                siteName: getAppTitle(),
                title: this.metaTitle,
                description: this.pageDescription,
                url: this.pageUrl,
                image: this.metaImage,
            }
        },
    },
})
