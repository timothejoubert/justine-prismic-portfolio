import VSplashScreenWrapper from '~/components/molecules/VSplashScreenWrapper/VSplashScreenWrapper.vue'

export default {
    component: VSplashScreenWrapper,
}

const Template = (_args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: `
        <VSplashScreenWrapper v-bind="$props"/>`,
})

export const Default = Template.bind({})
Default.args = {}
