import * as prismicT from "@prismicio/types";
import {FilledContentRelationshipField} from "@prismicio/types/src/value/contentRelationship";
import {PageDocument} from "~/types/prismic/prismic-types.generated";
import {PrismicDocument} from "@prismicio/types/src/value/document";

export const isInternalLinkFulled = (link: prismicT.LinkField & { uid?: string } ): link is prismicT.LinkField & FilledContentRelationshipField => {
    return !!link?.uid
}

export const isMediaFilled = (media: prismicT.ImageField): media is prismicT.ImageField<never, "filled"> => {
    return !!media
}

export const isPageDocument = (document: PrismicDocument): document is PageDocument => {
     return document.type === 'page'
}

 //
// export const isOnlyPages = (documents: Document[]): documents is PageDocument[] => {
//     return documents.every(document => isPageDocument(document))
// }
//
// export const isProjectDocument = (document: Document): document is ProjectDocument => {
//     return document.type === 'project'
// }
