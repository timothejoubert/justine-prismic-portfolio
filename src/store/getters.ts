import type { GetterTree } from 'vuex'
import { RootState } from '~/types/store'

export const getters: GetterTree<RootState, RootState> = {
    // alreadyVisited: (state: RootState) => state.alreadyVisited,
    getProjectByUid: (state: RootState) => {
        return (uid: string) => {
            return state.projects?.find((project) => project.uid === uid)
        }
    },
}

export default getters
