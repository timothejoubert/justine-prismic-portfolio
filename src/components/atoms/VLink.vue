<script lang="ts">
import Vue from 'vue'
import type { VNode, VNodeData } from 'vue'

type CustomVNodeData = VNodeData & Required<Pick<VNodeData, 'props' | 'attrs'>>

const DEFAULT_LABEL = 'En voir plus'

export default Vue.extend({
  name: 'VLink',
  functional: true,
  props: {
    label: {
      type: [String, Boolean],
      default: undefined,
    },
    url: String,
  },
  render(createElement, context): VNode | VNode[] {
    const url = context.props.url

    if (!url) {
      return (
        context.scopedSlots.default?.({ label: context.props.label }) ||
        context.slots()?.default ||
        (context.props.label && createElement('span', [context.props.label])) ||
        createElement('')
      )
    }

    const data: CustomVNodeData = Object.assign({ props: {}, attrs: {} }, context.data)
    const isRelative = url?.charAt(0) === '/'
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
