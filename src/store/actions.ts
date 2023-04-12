import type { ActionTree, ActionContext } from 'vuex'
import { Context } from '@nuxt/types'
import { PrismicDocument } from '@prismicio/types/src/value/document'
import { Document } from '@prismicio/client/types/documents'
import { RootState } from '~/types/store'
import MutationType from '~/constants/mutation-type'
import { CustomTypeName, MainMenu, Settings } from '~/types/prismic/app-prismic'
// import { Context, NuxtError } from '@nuxt/types'

const actions: ActionTree<RootState, RootState> = {
    async nuxtServerInit({ commit, dispatch }: ActionContext<RootState, RootState>, context: Context) {
        if (!('$prismic' in this)) console.log('prismic module not found')

        await dispatch('getCommonContent', context)
            .then(([mainMenu, settings]: Array<MainMenu | Settings>) => {
                commit(MutationType.SET_MAIN_MENU, mainMenu)
                commit(MutationType.SET_SETTINGS, settings)
            })
            .catch((fetchError: Error) => {
                console.log('failed to fetch mainMenu or setting', fetchError)
            })
    },
    getCommonContent(
        _actionContext: ActionContext<RootState, RootState>,
        context: Context
    ): Promise<Document<MainMenu | Settings>[]> {
        const mainMenu = context.$prismic.api.getSingle('main_menu' as CustomTypeName, {})
        const settings = context.$prismic.api.getSingle('settings' as CustomTypeName, {})

        return Promise.all([mainMenu, settings])
    },
    updatePageData({ commit }: ActionContext<RootState, RootState>, data: PrismicDocument) {
        commit(MutationType.CURRENT_PAGE_DATA, data)
    },
}

export default actions
