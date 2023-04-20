import VImage from '~/components/molecules/VImage/VImage.vue'

export default {
    component: VImage,
}

const Template = (_args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: `
        <VImage v-bind="$props"/>`,
})

export const Default = Template.bind({})
Default.args = {}
