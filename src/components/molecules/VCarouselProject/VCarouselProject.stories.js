import VCarouselProject from '~/components/molecules/VCarouselProject/VCarouselProject.vue'

export default {
    component: VCarouselProject,
}

const Template = (_args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: `
        <VCarouselProject v-bind="$props"/>`,
})

export const Default = Template.bind({})
Default.args = {}
