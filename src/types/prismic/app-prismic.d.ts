import { AnyRegularField } from '@prismicio/types/src/value/types'
import { GroupField } from '@prismicio/types/src/value/group'
import { SliceZone } from '@prismicio/types/src/value/sliceZone'
import { AllDocumentTypes, MainMenuDocumentDataLinksItem } from '~/types/prismic/prismic-types.generated'
import type * as GeneratedTypes from '~/types/prismic/prismic-types.generated'

// GLOBAL
export type BasicDocumentData = Record<string, AnyRegularField | GroupField | SliceZone>
export type CustomTypeName = Pick<AllDocumentTypes, 'type'>['type']
export type MainPageData = PageData | ProjectData

// PAGE
export type PageDocument = GeneratedTypes.PageDocument
export type PageData = GeneratedTypes.ProjectDocument['data']

// PROJECT
export type ProjectDocument = GeneratedTypes.ProjectDocument
export type ProjectData = GeneratedTypes.ProjectDocument['data']
export type ProjectTag = ProjectData['tags']
export type ProjectCardData = ProjectData & { uid: string }

// MENU
export type MainMenuLinks = GeneratedTypes.MainMenuDocument
export type MenuItemList = GeneratedTypes.MainMenuDocument['data']['links']
export type MenuItem = MainMenuDocumentDataLinksItem

// COMMON CONTENT
export type Settings = GeneratedTypes.SettingsDocument
export type SettingsData = Settings['data']
export type MainMenu = GeneratedTypes.MainMenuDocument
export type MainMenuData = MainMenu['data']
