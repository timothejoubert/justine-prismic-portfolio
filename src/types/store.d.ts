import { NuxtError } from '@nuxt/types'
import { PrismicDocument } from '@prismicio/types/src/value/document'
import * as prismicT from '@prismicio/types'
import { MainMenuDocument, SettingsDocument } from '~/types/prismic/prismic-types.generated'
import { ProjectDocument } from '~/types/prismic/app-prismic'

interface RootState {
    // Prismic
    settings: SettingsDocument | null
    mainMenu: MainMenuDocument | null
    projects: ProjectDocument[]
    currentPageData: PrismicDocument | null

    // SplashScreen
    splashScreenDone: Boolean

    // Global
    windowWidth: number
    windowHeight: number
    errorPage: NuxtError | null
    prefersReducedMotion: boolean
    scrollIsDisabled: boolean
    mediaViewerData: null | prismicT.ImageField[]
    mediaViewerSlideIndex: number
    navDistanceFromBottom: number
}
