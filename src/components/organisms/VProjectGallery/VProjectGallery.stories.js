import VProjectGallery from '~/components/organisms/VProjectGallery/VProjectGallery.vue'

export default {
    component: VProjectGallery,
}

const Template = (_args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: `
        <v-project-gallery v-bind="$props"/>`,
})

export const Default = Template.bind({})
Default.args = {}
