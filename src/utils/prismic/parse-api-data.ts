import { Document } from "@prismicio/client/types/documents";
import type * as GeneratedTypes from '~/types/prismic/prismic-types.generated'
import { PageDocument, ProjectDocument } from "~/types/prismic/prismic-types.generated";
import { MenuItem } from "~/types/prismic/app-prismic";


export function getDocumentData<T> (document: Document): T {
    return document.data
}

export const getPageData = (pageDocument: Document): PageDocument['data'] => {
    return getDocumentData(pageDocument)
}

export const getProjectData = (projectPage: Document): ProjectDocument['data'] => {
    return getDocumentData(projectPage)
}

export const getProjectDataList = (document: Document[]): ProjectDocument['data'][] => {
    return document.map((projectPage) => getProjectData(projectPage))
}

export const getMenuLinkList = (mainMenu: GeneratedTypes.MainMenuDocument): MenuItem[] => {
    return mainMenu.data.links as MenuItem[]
}
