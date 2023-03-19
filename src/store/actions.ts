import type { ActionTree, ActionContext } from 'vuex'
import { RootState } from '~/types/store'
import mutationType from "~/constants/mutation-type";
import {Context} from "@nuxt/types";
import {CustomTypeName} from "~/types/prismic/app-prismic";
// import { Context, NuxtError } from '@nuxt/types'

const actions: ActionTree<RootState, RootState> = {
    async nuxtServerInit({commit, dispatch}: ActionContext<RootState, RootState>, context: Context) {
        if (!("$prismic" in this)) {
            console.log('prismic module not found')
            return
        }

        const mainMenu = await context.$prismic.api.getSingle('main_menu' as CustomTypeName, {})
        const settings = await context.$prismic.api.getSingle('settings' as CustomTypeName, {})

        commit(mutationType.SET_MAIN_MENU, mainMenu)
        commit(mutationType.SET_SETTINGS, settings)
    },
    async load(store) {
        // console.log('load function in store')
    },
}

export default actions
