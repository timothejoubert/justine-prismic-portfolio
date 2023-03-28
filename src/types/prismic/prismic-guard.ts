import * as prismicT from '@prismicio/types'
import { FilledContentRelationshipField } from '@prismicio/types/src/value/contentRelationship'
import { PrismicDocument } from '@prismicio/types/src/value/document'
import { PageDocument } from '~/types/prismic/prismic-types.generated'
import NodeUid from '~/constants/node-uid'

export function isGroupFulled<T>(group: prismicT.GroupField): group is prismicT.GroupField<T | any, 'filled'> {
    return !!group?.length
}

export const isMediaFilled = (media: prismicT.ImageField): media is prismicT.ImageField<never, 'filled'> => {
    return !!media
}

export const isPageDocument = (document: PrismicDocument): document is PageDocument => {
    return document.type === 'page'
}

type PrismicDocumentKey = {
    id?: string
    type?: string
    href?: string
    data?: any
    link_type?: string
    uid?: string | null
}

type PrismicLinkKey = {
    id?: string
    type?: string
    link_type?: string
    href?: string
    uid?: string
    data?: any
    isBroken?: boolean
}

export const hasType = (document: unknown & { type?: string | null }): document is { type: string } => {
    return !!document?.type
}

export const hasUid = (document: unknown & { uid?: string | null }): document is { uid: string } => {
    return !!document?.uid
}

export const isPrismicDocument = (document: unknown & PrismicDocumentKey): document is PrismicDocument => {
    return 'id' in document && 'type' in document && 'href' in document && 'data' in document
}

export const isDocumentLink = (document: any & PrismicLinkKey): document is FilledContentRelationshipField => {
    return 'id' in document && 'type' in document && 'link_type' in document && 'uid' in document && !document.isBroken
}

export const isValidUidConst = (value: string): value is NodeUid => {
    return Object.values<string>(NodeUid).includes(value)
}

//
// export const isOnlyPages = (documents: Document[]): documents is PageDocument[] => {
//     return documents.every(document => isPageDocument(document))
// }
//
// export const isProjectDocument = (document: Document): document is ProjectDocument => {
//     return document.type === 'project'
// }
