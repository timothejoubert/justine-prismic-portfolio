import VText from '~/components/atoms/VText/VText.vue'

export default {
    component: VText,
}

const Template = (_args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: `
        <VText v-bind="$props"/>`,
})

export const Default = Template.bind({})
Default.args = {}
