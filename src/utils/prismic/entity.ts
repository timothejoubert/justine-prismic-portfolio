import { PrismicDocumentWithUID } from "@prismicio/types/src/value/document";
import { PrismicDocument } from "@prismicio/types";
import {hasUid} from "~/utils/prismic/utils";
import {CustomTypeName} from "~/types/prismic/app-prismic";

//
// Node type
//

export function isEntityType(document: PrismicDocument, type: CustomTypeName): boolean {
    return document?.type === type
}

export const isSettings = (document: PrismicDocument): boolean => {
    return isEntityType(document, 'settings')
}

export const isPage = (document: PrismicDocument): boolean => {
    return isEntityType(document, 'page')
}

export const isProjectPage = (document: PrismicDocument): boolean => {
    return isEntityType(document, 'project')
}

export const isMainMenu = (document: PrismicDocument): boolean => {
    return isEntityType(document, "main_menu")
}

//
// Node by uid
//

export function isDocumentByUid(document: PrismicDocument, name: string): boolean {
    return hasUid(document) && (document as PrismicDocumentWithUID).uid === name
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
