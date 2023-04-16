import VFooter from '~/components/organisms/VFooter/VFooter.vue'

export default {
    component: VFooter,
}

const Template = (_args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: `
        <VFooter v-bind="$props"/>`,
})

export const Default = Template.bind({})
Default.args = {}
