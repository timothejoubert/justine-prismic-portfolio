import { PrismicDocumentWithUID} from "@prismicio/types/src/value/document";
import {PrismicDocument} from "@prismicio/types";

//
// Node type
//

export function isEntityType(document: PrismicDocument, type: string): boolean {
    return document.type === type
}

export const isPage = (document: PrismicDocument): boolean => {
    return isEntityType(document, 'Page')
}

export const isListingPage = (document: PrismicDocument): boolean => {
    return !!document.data?.parent
}

export const isNodeMenu = (document: PrismicDocument): boolean => {
    return isEntityType(document, "navigation")
}

//
// Node by uid
//

export function isDocumentByUid(document: PrismicDocument, name: string): boolean {
    return hasUid(document) && document.uid === name
}

const hasUid = (document: PrismicDocument): document is PrismicDocumentWithUID => {
    return !!document?.uid
}

export const isProjectListing = (document: PrismicDocument): boolean => {
    return isPage(document) && isDocumentByUid(document, 'project-page')
}

export const isSketchBooks = (document: PrismicDocument): boolean => {
    return isPage(document) && isDocumentByUid(document, 'sketchbook')
}

export const isAbout = (document: PrismicDocument): boolean => {
    return isPage(document) && isDocumentByUid(document, 'about')
}

export const isHomePage = (document: PrismicDocument): boolean => {
    return isPage(document) && isDocumentByUid(document, 'home')
}

export const isProjectPage = (document: PrismicDocument): boolean => {
    return isListingPage(document) && isProjectListing(document)
}
