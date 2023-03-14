import { RootState } from '~/types/store'

export default (): RootState => ({
    // prismic
    settings: null,
    mainMenu: null,
    projects: null,
    // Data
    headData: null,
    projectsListingUid: [],
    // General
    errorPage: null,
    windowWidth: 0,
    windowHeight: 0,
    prefersReducedMotion: false,
})
