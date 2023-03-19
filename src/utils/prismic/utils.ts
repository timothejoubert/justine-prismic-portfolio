import {PrismicDocument, PrismicDocumentWithUID} from "@prismicio/types/src/value/document";
import Vue from "vue";
import * as prismicT from "@prismicio/types";
import {isInternalLinkFulled} from "~/types/prismic/prismic-guard";


export const isDocumentWithSlices = (document: PrismicDocument): boolean => {
    return !!document['data']?.slice?.length
}

export const hasUid = (document: PrismicDocument): document is PrismicDocumentWithUID => {
    return !!document?.uid
}

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

export const prismicFieldToString = (value: any = 'undefined value in prismicFieldToString', context: Vue): string => {
    if (typeof value === 'string') return value
    return context.$prismic.asText(value)
}

export const asText = (context: Vue, value?: any): string | undefined => {
    if (!value) return
    if (typeof value === 'string') return value
    else return context.$prismic.asText(value)
}

export const getInternalLinkUid = (link: prismicT.LinkField): string | undefined => {
    return isInternalLinkFulled(link) ? link.uid : undefined
}
