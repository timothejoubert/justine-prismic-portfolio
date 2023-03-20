import * as prismicT from "@prismicio/types";
import {FilledContentRelationshipField} from "@prismicio/types/src/value/contentRelationship";
import {PageDocument} from "~/types/prismic/prismic-types.generated";
import {PrismicDocument, PrismicDocumentWithUID} from "@prismicio/types/src/value/document";
import NodeUid from "~/constants/node-uid";

export const isInternalLinkFulled = (link: prismicT.LinkField & { uid?: string } ): link is prismicT.LinkField & FilledContentRelationshipField => {
    return !!link?.uid
}

export function isGroupFulled<T>(group: prismicT.GroupField ): group is prismicT.GroupField<T | any, "filled"> {
    return !!group?.length
}

export const isMediaFilled = (media: prismicT.ImageField): media is prismicT.ImageField<never, "filled"> => {
    return !!media
}

export const isPageDocument = (document: PrismicDocument): document is PageDocument => {
     return document.type === 'page'
}

type NeedPrismicDocumentKey = {
    id?: string
    type?: string
    href?: string
    data?: any
}

export const hasUid = ( document: unknown & {uid?: string | null }): document is PrismicDocumentWithUID => {
    return !!document?.uid
}

export const isPrismicDocument = (document: unknown & NeedPrismicDocumentKey): document is PrismicDocument => {
    return ('id' in document) && ('type' in document) && ('href' in document) && ('data' in document)
}

export const isValidUidConst = (value: string): value is NodeUid => {
    return Object.values<string>(NodeUid).includes(value);
}

 //
// export const isOnlyPages = (documents: Document[]): documents is PageDocument[] => {
//     return documents.every(document => isPageDocument(document))
// }
//
// export const isProjectDocument = (document: Document): document is ProjectDocument => {
//     return document.type === 'project'
// }
