import VMediaViewer from '~/components/organisms/VMediaViewer/VMediaViewer.vue'

export default {
    component: VMediaViewer,
}

const Template = (_args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: `<VMediaViewer v-bind="$props" />`,
})

export const Default = Template.bind({})
Default.args = {}
