import { Document } from '@prismicio/client/types/documents'
import type * as GeneratedTypes from '~/types/prismic/prismic-types.generated'
import { MenuItem } from '~/types/prismic/app-prismic'

export function getDocumentData<T>(document: Document): T {
    return document.data
}

export const getMenuLinkList = (mainMenu: GeneratedTypes.MainMenuDocument): MenuItem[] => {
    return mainMenu.data.links as MenuItem[]
}
