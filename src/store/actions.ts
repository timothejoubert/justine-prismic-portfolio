import type { ActionTree, ActionContext } from 'vuex'
import { RootState } from '~/types/store'
import mutationType from "~/constants/mutation-type";
import {Context} from "@nuxt/types";
import {getListingPageUid} from "~/utils/entity";
import {PrismicDocument, PrismicDocumentHeader} from "@prismicio/types/src/value/document";
import {PageDocumentData} from "~/types/prismic-types.generated";
import {PageDocument} from "~/types/prismic";
// import MutationType from '~/constants/mutation-type'
// import { getHeadData } from '~/utils/parse-api-data'
// import { Context, NuxtError } from '@nuxt/types'

const actions: ActionTree<RootState, RootState> = {
    async nuxtServerInit({commit, dispatch}: ActionContext<RootState, RootState>, context: Context) {
        if (!("$prismic" in this)) {
            console.log('prismic module not found')
            return
        }

        const mainMenu = await context.$prismic.api.getSingle('main-menu', {})
        const settings = await context.$prismic.api.getSingle('settings', {})
        const pages = await context.$prismic.api.query(
            context.$prismic.predicates.at('document.type', 'page')
        ).then((response) => response.results) as PageDocument[]

        commit(mutationType.SET_MAIN_MENU, mainMenu)
        commit(mutationType.SET_SETTINGS, settings)
        commit(mutationType.SET_PROJECTS, pages)
        commit(mutationType.SET_PROJECTS_LISTING, Array.isArray(pages) && pages?.length ? getListingPageUid(pages) : [])
    },
    async load(store) {
        // console.log('load function in store')
    },
}

export default actions
