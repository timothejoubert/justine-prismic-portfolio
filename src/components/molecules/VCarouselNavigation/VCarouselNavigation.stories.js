import VCarouselNavigation from '~/components/molecules/VCarouselNavigation/VCarouselNavigation.vue'

export default {
    component: VCarouselNavigation,
    argTypes: {
        theme: {
            options: ['light', 'dark'],
            type: 'select',
        },
    },
    args: {
        length: 5,
    },
}

const Template = (_args, { argTypes }) => ({
    props: Object.keys(argTypes),
    data() {
        return {
            value: null,
        }
    },
    mounted() {
        this.value = this.currentIndex || 0
    },
    methods: {
        onChangeValue(newIndex) {
            this.value = newIndex
        },
    },
    template: `<v-carousel-navigation v-bind="$props" @input="onChangeValue" />`,
})

export const FirstSlide = Template.bind({})
FirstSlide.args = {
    currentIndex: 0,
}

export const Middle = Template.bind({})
Middle.args = {
    currentIndex: 2,
}

export const End = Template.bind({})
End.args = {
    currentIndex: 5,
}

export const darkTheme = Template.bind({})
darkTheme.args = {
    currentIndex: 2,
    length: 5,
    theme: 'dark-15',
}
