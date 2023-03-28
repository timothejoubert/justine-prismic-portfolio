import type { PrismicDocument } from '@prismicio/types'
import { CustomTypeName } from '~/types/prismic/app-prismic'
import NodeUid from '~/constants/node-uid'
import { hasUid, isPrismicDocument } from '~/types/prismic/prismic-guard'

//
// Node type
//

export function isEntityType(document: Partial<PrismicDocument>, type: CustomTypeName): boolean {
    return document?.type === type
}

export const isSettings = (document: PrismicDocument): boolean => {
    return isEntityType(document, 'settings')
}

export const isPage = (document: PrismicDocument): boolean => {
    return isEntityType(document, 'page')
}

export const isProjectDocument = (document?: Partial<PrismicDocument>): boolean => {
    return !!document && isEntityType(document, 'project')
}

export const isMainMenu = (document: PrismicDocument): boolean => {
    return isEntityType(document, 'main_menu')
}

//
// Node by uid
//

export function isDocumentByUid(document: PrismicDocument, name: string): boolean {
    return hasUid(document) && document.uid === name
}

export const isHomePage = (element?: Record<string, any> | string): boolean => {
    if (!element) return false
    if (typeof element === 'string') return element === NodeUid.HOME || element === '/'
    if (isPrismicDocument(element)) isDocumentByUid(element, NodeUid.HOME)
    console.log("can't find element in function isHomePage")
    return false
}

export const isProjectListing = (document: PrismicDocument): boolean => {
    return isPage(document) && isDocumentByUid(document, 'projects')
}

export const isSketchBooks = (document: PrismicDocument): boolean => {
    return isPage(document) && isDocumentByUid(document, 'sketchbooks')
}

export const isAbout = (document: PrismicDocument): boolean => {
    return isPage(document) && isDocumentByUid(document, 'about')
}
