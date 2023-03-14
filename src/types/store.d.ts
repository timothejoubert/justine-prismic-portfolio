import { NuxtError } from '@nuxt/types'
import { HeadData } from '~/types/app'
import {MenuDocumentData, PageDocumentData, SettingsDocumentData} from "~/types/prismic-types.generated";
import {PrismicDocument} from "@prismicio/types/src/value/document";

interface RootState {
    // Prismic
    settings: SettingsDocumentData | null,
    mainMenu: MenuDocumentData | null,
    projects: PrismicDocument[] | null,
    // Data
    headData: null | HeadData
    projectsListingUid: string[]
    // Global
    windowWidth: number
    windowHeight: number
    errorPage: NuxtError | null
    prefersReducedMotion: boolean
}
