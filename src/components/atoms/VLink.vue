<script lang="ts">
import Vue from 'vue'
import type { PropType, VNode, VNodeData } from 'vue'
import type { PrismicDocument } from '@prismicio/types'
import { ContentRelationshipField } from '@prismicio/types/src/value/contentRelationship'
import type { Document } from '@prismicio/client/types/documents'
import { hasUid, isPrismicDocument } from '~/types/prismic/prismic-guard'
import { isProjectDocument } from '~/utils/prismic/entity'
import NodeUid from '~/constants/node-uid'
import { isInternalRelationLinkWithUidFulled } from '~/utils/prismic/field-relation'

type CustomVNodeData = VNodeData & Required<Pick<VNodeData, 'props' | 'attrs'>>

type PrismicDocumentLink = Document | PrismicDocument | ContentRelationshipField | { [key: string]: any }

const DEFAULT_LABEL = 'En voir plus'

export default Vue.extend({
    name: 'VLink',
    functional: true,
    props: {
        label: {
            type: [String, Boolean],
            default: undefined,
        },
        href: String,
        reference: Object as PropType<PrismicDocumentLink>,
    },
    render(createElement, context): VNode | VNode[] {
        const { href, reference } = context.props

        if (!href && !reference) {
            return (
                context.scopedSlots.default?.({ label: context.props.label }) ||
                context.slots()?.default ||
                (context.props.label && createElement('span', [context.props.label])) ||
                createElement('')
            )
        }

        const isProject =
            reference &&
            (isPrismicDocument(reference) || isInternalRelationLinkWithUidFulled(reference)) &&
            isProjectDocument(reference)
        const isDocument = reference && hasUid(reference)

        let url = ''
        if (isProject) {
            url = `/${NodeUid.PROJECT_LISTING}/${reference.uid}`
        } else if (isDocument) {
            url = reference.uid
        } else if (href) {
            url = href
        } else {
            url = context.parent.$config.homePath
        }

        const data: CustomVNodeData = Object.assign({ props: {}, attrs: {} }, context.data)

        const isRelative = isProject || isDocument
        const isInternal = (isRelative || url?.charAt(0) === '#') && !context.data.attrs?.target
        const isExternal = !isInternal && !!url
        const isDownload = !isInternal && !isExternal
        let label: string | undefined | boolean = context.props.label

        if (!label) {
            label = DEFAULT_LABEL
        }

        if (isInternal) {
            data.props.to = url
        } else if (isExternal) {
            data.attrs = {
                ...data.attrs,
                href: url,
                target: context.data.attrs?.target || '_blank',
                rel: !isRelative && 'noopener',
            }
        }

        if (!data.attrs!.href && !data.props!.to) {
            return context.slots()?.default || (label ? createElement('span', String(label)) : createElement(''))
        }

        return createElement(
            isExternal || isDownload ? 'a' : 'nuxt-link',
            data,
            context.slots()?.default || (label && String(label)) || ''
        )
    },
})
</script>
