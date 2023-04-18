import VMasonry from '~/components/organisms/VMasonry/VMasonry.vue'

export default {
    component: VMasonry,
}

const Template = (_args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: `
        <VMasonry v-bind="$props"/>`,
})

export const Default = Template.bind({})
Default.args = {}
