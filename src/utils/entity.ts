import { PrismicDocumentWithUID } from "@prismicio/types/src/value/document";
import { PrismicDocument } from "@prismicio/types";

//
// Node type
//

type NodeType = 'page' | 'main-menu' | 'settings'

export function isEntityType(document: PrismicDocument, type: NodeType): boolean {
    return document.type === type
}

export const isSettings = (document: PrismicDocument): boolean => {
    return isEntityType(document, 'settings')
}

export const isPage = (document: PrismicDocument): boolean => {
    return isEntityType(document, 'page')
}

export const isMainMenu = (document: PrismicDocument): boolean => {
    return isEntityType(document, "main-menu")
}

//
// Node data
//

export const hasParentPage = (document: PrismicDocument): boolean => {
    return !!document.data?.parent?.uid || !!document.data?.parent?.slug
}

export const getListingPageUid = (documents: PrismicDocument[]): string[] => {
    return documents
        ?.filter((document) => hasParentPage(document))
        ?.map((document) => document.data.parent.uid)
}

export const isListingPage = (documents: PrismicDocument[], uid: string): boolean => {
    return !!getListingPageUid(documents)?.includes(uid)
}

//
// Node by uid
//

export function isDocumentByUid(document: PrismicDocument, name: string): boolean {
    return hasUid(document) && (document as PrismicDocumentWithUID).uid === name
}

const hasUid = (document: PrismicDocument): document is PrismicDocumentWithUID => {
    return !!document?.uid
}

export const isProjectListing = (document: PrismicDocument): boolean => {
    return isPage(document) && isDocumentByUid(document, 'project-listing')
}

export const isSketchBooks = (document: PrismicDocument): boolean => {
    return isPage(document) && isDocumentByUid(document, 'sketchbooks')
}

export const isAbout = (document: PrismicDocument): boolean => {
    return isPage(document) && isDocumentByUid(document, 'about')
}

export const isHomePage = (document: PrismicDocument): boolean => {
    return isPage(document) && isDocumentByUid(document, 'home-page')
}

export const isProjectPage = (document: PrismicDocument): boolean => {
    return isPage(document) && hasParentPage(document) && isProjectListing(document.data.parent)
}
