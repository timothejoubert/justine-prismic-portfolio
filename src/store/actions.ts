import type { ActionTree, ActionContext } from 'vuex'
import { RootState } from '~/types/store'
import mutationType from "~/constants/mutation-type";
import {Context} from "@nuxt/types";
// import MutationType from '~/constants/mutation-type'
// import { getHeadData } from '~/utils/parse-api-data'
// import { Context, NuxtError } from '@nuxt/types'

const actions: ActionTree<RootState, RootState> = {
    async nuxtServerInit({commit, dispatch}: ActionContext<RootState, RootState>, context: Context) {
        if (!("$prismic" in this)) {
            console.log('prismic module not found')
            return
        }

        const navigation = await context.$prismic.api.getSingle('navigation')
        const settings = await context.$prismic.api.getSingle('settings')

        commit(mutationType.SET_NAVIGATION, navigation || {})
        commit(mutationType.SET_SETTINGS, settings || {})
    },
    async load(store) {
        console.log('load function in store')
    },
}

export default actions
