import { NuxtError } from '@nuxt/types'
import { PrismicDocument } from '@prismicio/types/src/value/document'
import { MainMenuDocument, SettingsDocument } from '~/types/prismic/prismic-types.generated'

interface RootState {
    // Prismic
    settings: SettingsDocument | null
    mainMenu: MainMenuDocument | null
    projects: PrismicDocument[] | null
    currentPageData: PrismicDocument | null

    // Global
    windowWidth: number
    windowHeight: number
    errorPage: NuxtError | null
    prefersReducedMotion: boolean
}
