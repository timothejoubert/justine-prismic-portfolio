import type { PrismicDocument } from '@prismicio/types'
import { hasUid, isPrismicDocument } from '~/types/prismic/prismic-guard'
import NodeUid from '~/constants/node-uid'
import { isPage } from '~/utils/prismic/entity'
import { getListingPageUid } from '~/utils/prismic/type-check'

export function isDocumentByUid(document: PrismicDocument, name: string): boolean {
    return hasUid(document) && document.uid === name
}

export const isHomePage = (element?: Record<string, any> | string): boolean => {
    if (!element) return false
    if (typeof element === 'string') return element === NodeUid.HOME || element === '/'
    if (isPrismicDocument(element)) return isDocumentByUid(element, NodeUid.HOME)
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

export const isListingPage = (documents: PrismicDocument[], uid: string): boolean => {
    return !!getListingPageUid(documents)?.includes(uid)
}

export const isNestedDocument = (document: PrismicDocument): boolean => {
    return document.data.parent_page
}

export const isDocumentWithSlices = (document: PrismicDocument): boolean => {
    return !!document.data?.slice?.length
}

export const hasParentPage = (document: PrismicDocument): boolean => {
    return !!document.data?.parent?.uid || !!document.data?.parent?.slug
}
