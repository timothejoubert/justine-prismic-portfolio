import type { ActionTree, ActionContext } from 'vuex'
import { Context } from '@nuxt/types'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import type { BodyScrollOptions } from 'body-scroll-lock'
import { PrismicDocument } from '@prismicio/types/src/value/document'
import { Document } from '@prismicio/client/types/documents'
import { RootState } from '~/types/store'
import MutationType from '~/constants/mutation-type'
import { CustomTypeName, MainMenu, ProjectDocument, Settings } from '~/types/prismic/app-prismic'
import CustomType from '~/constants/custom-type'
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

        await dispatch('getProjects', context)
            .then((projects: Array<ProjectDocument>) => {
                // TODO: order project by date
                commit(MutationType.SET_PROJECTS, projects)
            })
            .catch((fetchError: Error) => {
                console.log('failed to fetch mainMenu or setting', fetchError)
            })
    },
    getCommonContent(
        _actionContext: ActionContext<RootState, RootState>,
        context: Context
    ): Promise<Document<MainMenu | Settings>[]> {
        const mainMenu = context.$prismic.api.getSingle(CustomType.MAIN_MENU as CustomTypeName, {})
        const settings = context.$prismic.api.getSingle(CustomType.SETTINGS as CustomTypeName, {})

        return Promise.all([mainMenu, settings])
    },
    getProjects(
        _actionContext: ActionContext<RootState, RootState>,
        context: Context
    ): Promise<Document<ProjectDocument>[]> {
        const projects = context.$prismic.api
            .query(context.$prismic.predicates.at('document.type', CustomType.PROJECT as CustomTypeName))
            .then((response) => response.results)

        return Promise.resolve(projects)
    },
    updatePageData({ commit }: ActionContext<RootState, RootState>, data: PrismicDocument) {
        commit(MutationType.CURRENT_PAGE_DATA, data)
    },
    disableScroll(
        { commit }: ActionContext<RootState, RootState>,
        { element, options }: { element: HTMLElement; options?: BodyScrollOptions }
    ) {
        disableBodyScroll(element, { reserveScrollBarGap: true, ...options })

        commit(MutationType.SCROLL_IS_DISABLED, true)
    },
    enableScroll({ commit }: ActionContext<RootState, RootState>, { element }: { element: HTMLElement }) {
        enableBodyScroll(element)

        commit(MutationType.SCROLL_IS_DISABLED, false)
    },
}

export default actions
