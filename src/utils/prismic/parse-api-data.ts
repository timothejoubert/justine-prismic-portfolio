import { Document } from '@prismicio/client/types/documents'
import { MainMenu, MenuItem } from '~/types/prismic/app-prismic'

export function getDocumentData<T>(document: Document): T {
    return document.data
}

export const getMenuLinkList = (mainMenu: MainMenu | undefined): MenuItem[] => {
    if (!mainMenu) return []
    return mainMenu.data.links as MenuItem[]
}
