import { NodeElement, PageData } from '~/types/app'
import {PageDocumentData} from "~/types/prismic-types.generated";

//
// Node type
//

export function isEntityType(entity: NodeElement, type: string): boolean {
    return entity['@type'] === type
}

export const isPage = (entity: NodeElement): entity is PageData => {
    return isEntityType(entity, 'Page')
}

export const isListingPage = (entity: NodeElement): Boolean => {
    return isEntityType(entity, 'PageListing')
}

export const isNodeMenu = (entity: NodeElement): boolean => {
    return isPage(entity) || isProjectListing(entity)
}

//
// Node name
//

// TODO: update type name

export function isNodeElement(entity: PageDocumentData | undefined, name: string): boolean {
    return !!entity?.type && entity.type === name
}

export const isProjectListing = (entity?: PageDocumentData): boolean => {
    return isNodeElement(entity, 'projectListing')
}

export const isSketchBooks = (entity?: PageDocumentData): boolean => {
    return isNodeElement(entity, 'sketchbooks')
}

export const isAbout = (entity?: PageDocumentData): boolean => {
    return isNodeElement(entity, 'about')
}

export const isHomePage = (entity?: PageDocumentData): boolean => {
    return isNodeElement(entity, 'homePage')
}

export const isProject = (entity?: PageDocumentData): boolean => {
    return isNodeElement(entity, 'project')
}
