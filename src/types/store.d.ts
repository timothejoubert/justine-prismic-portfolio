import { NuxtError } from '@nuxt/types'
import { MainMenuDocument, SettingsDocument } from "~/types/prismic/prismic-types.generated";
import {PrismicDocument} from "@prismicio/types/src/value/document";

interface RootState {
    // Prismic
    settings: SettingsDocument | null,
    mainMenu: MainMenuDocument | null,
    projects: PrismicDocument[] | null,

    // Global
    windowWidth: number
    windowHeight: number
    errorPage: NuxtError | null
    prefersReducedMotion: boolean
}
