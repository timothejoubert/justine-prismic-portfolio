import type { ActionTree, ActionContext } from 'vuex'
import { Context } from '@nuxt/types'
import { PrismicDocument } from '@prismicio/types/src/value/document'
import { RootState } from '~/types/store'
import MutationType from '~/constants/mutation-type'
import { CustomTypeName } from '~/types/prismic/app-prismic'
// import { Context, NuxtError } from '@nuxt/types'

const actions: ActionTree<RootState, RootState> = {
    async nuxtServerInit({ commit }: ActionContext<RootState, RootState>, context: Context) {
        if (!('$prismic' in this)) {
            console.log('prismic module not found')
            return
        }

        const mainMenu = await context.$prismic.api.getSingle('main_menu' as CustomTypeName, {})
        const settings = await context.$prismic.api.getSingle('settings' as CustomTypeName, {})

        commit(MutationType.SET_MAIN_MENU, mainMenu)
        commit(MutationType.SET_SETTINGS, settings)
    },
    updatePageData({ commit }: ActionContext<RootState, RootState>, data: PrismicDocument) {
        commit(MutationType.CURRENT_PAGE_DATA, data)
    },
}

export default actions
