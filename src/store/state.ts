import { RootState } from '~/types/store'

export default (): RootState => ({
    // prismic
    settings: {},
    navigation: {},
    // Data
    headData: null,
    // General
    errorPage: null,
    windowWidth: 0,
    windowHeight: 0,
})
