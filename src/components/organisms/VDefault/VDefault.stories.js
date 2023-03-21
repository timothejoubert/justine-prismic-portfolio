import VDefault from '~/components/organisms/VDefault/VDefault.vue'

export default {
  component: VDefault,
}

const Template = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<VDefault v-bind="$props" />`,
})

export const Default = Template.bind({})
Default.args = {}
