import {PrismicDocument} from "@prismicio/types/src/value/document";
import * as prismicT from "@prismicio/types";
import {isInternalLinkFulled} from "~/types/prismic/prismic-guard";
import NodeUid from "~/constants/node-uid";
import {Route} from "vue-router";


export const isDocumentWithSlices = (document: PrismicDocument): boolean => {
    return !!document['data']?.slice?.length
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

export const getInternalLinkUid = (link: prismicT.LinkField): string | undefined => {
    return isInternalLinkFulled(link) ? link.uid : undefined
}

export const isHomeRoute = (routPath: string, uid?: string): boolean => {
    return routPath === '/' || uid === NodeUid.HOME
}

export const isNestedDocument = (document: PrismicDocument): boolean => {
    return document.data.parent_page
}

export const getProjectUid = (route: Route['params']): string | false => {
    const path = route?.pathMatch?.split('/')
    const isProjectsRoute = path?.[0] === NodeUid.PROJECT_LISTING
    return isProjectsRoute ? path?.[path?.length - 1] : false
}
