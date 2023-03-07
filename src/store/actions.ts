import type { ActionTree } from 'vuex'
import { RootState } from '~/types/store'
import mutationType from "~/constants/mutation-type";
// import MutationType from '~/constants/mutation-type'
// import { getHeadData } from '~/utils/parse-api-data'
// import { Context, NuxtError } from '@nuxt/types'

const actions: ActionTree<RootState, RootState> = {
    async load (store) {
        if (!("$prismic" in this)) {
            console.log('prismic module not found')
            return
        }

        const navigation = await this.$prismic.api.getSingle('navigation')
        const settings = await this.$prismic.api.getSingle('settings')

        store.commit(mutationType.SET_NAVIGATION, navigation)
        store.commit(mutationType.SET_SETTINGS, settings)
    },
}

export default actions
