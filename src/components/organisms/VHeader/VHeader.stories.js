import VHeader from '~/components/organisms/VHeader/VHeader.vue'

export default {
    component: VHeader,
}

const Template = (_args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: `
        <VHeader v-bind="$props"/>`,
})

export const Default = Template.bind({})
Default.args = {}
