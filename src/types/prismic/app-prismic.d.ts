import type * as GeneratedTypes from '~/types/prismic/prismic-types.generated'
import { AllDocumentTypes, MainMenuDocumentDataLinksItem } from "~/types/prismic/prismic-types.generated";


// GLOBAL
export type CustomTypeName = Pick<AllDocumentTypes, "type">["type"]
export type MainPageData = PageData | ProjectData

// PAGE
export type PageDocument = GeneratedTypes.PageDocument
export type PageData = GeneratedTypes.ProjectDocument['data']

// PROJECT
export type ProjectDocument = GeneratedTypes.ProjectDocument
export type ProjectData = GeneratedTypes.ProjectDocument['data'] & { url?: string }

// MENU
export type MainMenuLinks = GeneratedTypes.MainMenuDocument
export type MenuItemList = GeneratedTypes.MainMenuDocument['data']['links']
export type MenuItem = MainMenuDocumentDataLinksItem
