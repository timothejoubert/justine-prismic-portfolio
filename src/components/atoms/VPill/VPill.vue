<script lang="ts">
import Vue from 'vue'
import type { PropType, VNode } from 'vue'

export default Vue.extend({
  name: 'VPill',
  functional: true,
  props: {
    label: String as PropType<String>,
    size: String as PropType<'s' | 'm' | 'l' | 'xl'>,
  },
  render(createElement, context): VNode {
    const label = context.props?.label?.toString() || context.slots()?.default?.[0]
    if (!label) createElement('')

    const classNames = [
      typeof context.props.size === 'string' && context.$style['root--size-' + context.props.size],
      context.data.staticClass,
      context.data.class,
      context.$style.root,
      'text-h3',
    ]

    return createElement('div', { ...context.data, class: classNames }, [label])
  },
})
</script>

<style lang="scss" module>
.root {
    display: inline-block;
    min-width: rem(220);
    padding: rem(14) rem(50);
    background-color: var(--color-main-soft);
    border-radius: rem(75);
    color: var(--color-main);
}
</style>
