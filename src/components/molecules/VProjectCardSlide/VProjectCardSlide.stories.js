import VProjectCardSlide from '~/components/molecules/VProjectCardSlide/VProjectCardSlide.vue'

export default {
    component: VProjectCardSlide,
}

const Template = (_args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: `<VProjectCardSlide v-bind="$props" />`,
})

export const Default = Template.bind({})
Default.args = {}
