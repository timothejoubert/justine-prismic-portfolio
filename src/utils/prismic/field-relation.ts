import * as prismicT from '@prismicio/types'
import {
    ContentRelationshipField,
    FilledContentRelationshipField,
} from '@prismicio/types/src/value/contentRelationship'
import { FilledLinkToWebField } from '@prismicio/types/src/value/link'
import { LinkToMediaField } from '@prismicio/types/src/value/linkToMedia'

type GlobalLinkFulled = {
    link_type: string
    id?: string
    name?: string
    url?: string
}

type GlobalRelationLinkFulled = {
    link_type?: string
    id?: string
    uid?: string
    type?: string
    tags?: string[]
    lang?: string
}

export const isRelationLink = (link: unknown & Partial<Record<'link_type', any>>): link is prismicT.LinkField => {
    return 'link_type' in link && !!link.link_type
}

export const isRelationLinkFulled = (
    link: unknown & GlobalLinkFulled
): link is ContentRelationshipField | FilledLinkToWebField | LinkToMediaField => {
    return isRelationLink(link) && ('id' in link || 'name' in link || 'url' in link)
}

export const isInternalRelationLinkFulled = (
    link: unknown & GlobalRelationLinkFulled
): link is FilledContentRelationshipField => {
    return 'id' in link && 'type' in link && 'tags' in link && 'lang' in link
}

export const isInternalRelationLinkWithUidFulled = (
    link: unknown & GlobalRelationLinkFulled
): link is FilledContentRelationshipField => {
    return isInternalRelationLinkFulled(link) && 'uid' in link
}

export const getRelationLinkUid = (link: prismicT.LinkField): string | undefined => {
    return isInternalRelationLinkWithUidFulled(link) ? link.uid : undefined
}
