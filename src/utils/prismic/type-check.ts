import { PrismicDocument } from '@prismicio/types/src/value/document'
import NodeUid from '~/constants/node-uid'
import { hasParentPage } from '~/utils/prismic/document'

export const getListingPageUid = (documents: PrismicDocument[]): string[] => {
    return documents?.filter((document) => hasParentPage(document))?.map((document) => document.data.parent.uid)
}

export const isHomeRoute = (routPath: string, uid?: string): boolean => {
    return routPath === '/' || uid === NodeUid.HOME
}
