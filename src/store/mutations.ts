import type { MutationTree } from 'vuex'
import MutationType from '~/constants/mutation-type'
import { RootState } from '~/types/store'
import { HeadData } from '~/types/app'
import {MenuDocumentData, SettingsDocumentData} from "~/types/prismic/prismic-types.generated";
import {PrismicDocument} from "@prismicio/types/src/value/document";

export default {
    // Prismic
    [MutationType.SET_SETTINGS]: (state, settings: SettingsDocumentData) => (state.settings = settings),
    [MutationType.SET_MAIN_MENU]: (state, navigation: MenuDocumentData) => (state.mainMenu = navigation),
    [MutationType.SET_PROJECTS]: (state, value: PrismicDocument[]) => (state.projects = value),
    [MutationType.SET_PROJECTS_LISTING]: (state, value: string[]) => (state.projectsListingUid = value),
    // Data
    [MutationType.HEAD_DATA]: (state, value: HeadData) => (state.headData = value),
    // Global
    [MutationType.WINDOW_WIDTH]: (state, value: number) => (state.windowWidth = value),
    [MutationType.WINDOW_HEIGHT]: (state, value: number) => (state.windowHeight = value),
    [MutationType.PREFERS_REDUCED_MOTION]: (state, navigation: boolean) => (state.prefersReducedMotion = navigation),
} as MutationTree<RootState>
