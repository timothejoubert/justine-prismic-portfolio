import { NuxtError } from '@nuxt/types'
import { HeadData } from '~/types/app'

interface RootState {
    // Prismic
    settings: any,
    navigation: any,
    // Data
    headData: null | HeadData
    // Global
    windowWidth: number
    windowHeight: number
    errorPage: NuxtError | null
}
