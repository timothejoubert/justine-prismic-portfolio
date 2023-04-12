import Vue from 'vue'
import { Context } from '@nuxt/types'
import { MainMenu, Settings } from '~/types/prismic/app-prismic'
import MutationType from '~/constants/mutation-type'

export default Vue.extend({
    async fetch(context: Context) {
        const pages = context.store.state.mainMenu

        if (!pages) {
            await this.store
                .dispatch('getCommonContent', context)
                .then(([mainMenu]: Array<MainMenu | Settings>) => {
                    context.store.commit(MutationType.SET_MAIN_MENU, mainMenu)
                })
                .catch((fetchError: Error) => {
                    console.log('error on FetchMainMenu mixin', fetchError)
                })
        }
    },
})
