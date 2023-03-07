import type { MutationTree } from 'vuex'
import MutationType from '~/constants/mutation-type'
import { RootState } from '~/types/store'
import { HeadData } from '~/types/app'

export default {
    // Data
    [MutationType.HEAD_DATA]: (state, value: HeadData) => (state.headData = value),
    // Global
    [MutationType.WINDOW_WIDTH]: (state, value: number) => (state.windowWidth = value),
    [MutationType.WINDOW_HEIGHT]: (state, value: number) => (state.windowHeight = value),
    [MutationType.SET_SETTINGS]: (state, settings: any) => (state.settings = settings),
    [MutationType.SET_NAVIGATION]: (state, navigation: any) => (state.navigation = navigation),
} as MutationTree<RootState>
