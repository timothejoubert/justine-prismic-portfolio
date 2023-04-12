import Vue from 'vue'
import { Context } from '@nuxt/types'
import { MainMenu, MenuItem, Settings } from '~/types/prismic/app-prismic'
import { getMenuLinkList } from '~/utils/prismic/parse-api-data'

export default Vue.extend({
    data() {
        return {
            pages: [] as MenuItem[],
        }
    },
    async fetch(context: Context) {
        const pages = this.$store.state.mainMenu
        console.log('is mainMenu already store ?', !!pages)

        if (!pages) {
            await context.store.dispatch('getCommonContent', context).then(([mainMenu]: Array<MainMenu | Settings>) => {
                console.log('refetch in mixin', getMenuLinkList(mainMenu as MainMenu))
                this.pages = getMenuLinkList(mainMenu as MainMenu)
            })
        } else {
            this.pages = getMenuLinkList(pages)
        }
    },
})
