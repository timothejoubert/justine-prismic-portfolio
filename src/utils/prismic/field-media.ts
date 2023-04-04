import { LinkToMediaField } from '@prismicio/types/src/value/linkToMedia'
import { LinkType } from '@prismicio/types/src/value/link'
import type { EmptyLinkField, FilledLinkToMediaField } from '@prismicio/types'

export const getMediaType = (media: LinkToMediaField): typeof LinkType | string | null => {
    return isLinkMediaFulled(media) ? media.link_type : null
}

export const isLinkMediaFulled = (
    media: unknown & (EmptyLinkField<'Media'> | FilledLinkToMediaField)
): media is FilledLinkToMediaField => {
    return 'name' in media && 'url' in media
}
