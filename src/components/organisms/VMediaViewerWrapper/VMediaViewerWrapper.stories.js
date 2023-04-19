import VMediaViewerWrapper from '~/components/molecules/VMediaViewerWrapper/VMediaViewerWrapper.vue'
import MutationType from '~/constants/mutation-type'
import { createImage } from '~/utils/storybook/document'

export default {
    component: VMediaViewerWrapper,
}

const images = [
    createImage({ relativePath: '01.jpg ', imageWidth: '1000', imageHeight: '1000' }),
    createImage({ relativePath: '02.jpg ', imageWidth: '1000', imageHeight: '1000' }),
    createImage({ relativePath: '03.jpg ', imageWidth: '1000', imageHeight: '1000' }),
    createImage({ relativePath: '04.png ', imageWidth: '1000', imageHeight: '1000' }),
]

const Template = (_args, { argTypes }) => ({
    props: Object.keys(argTypes),
    data() {
        return {
            isOpen: false,
        }
    },
    methods: {
        toggle() {
            this.isOpen = !this.isOpen
        },
    },
    watch: {
        isOpen(value) {
            if (value) this.$store.commit(MutationType.MEDIA_VIEWER_DATA, images)
            else this.$store.commit(MutationType.MEDIA_VIEWER_DATA, null)
        },
        '$store.state.mediaViewerData'(value) {
            if (!value) this.isOpen = false
        },
    },
    template: `
        <div>
            <v-button :label="$t('media_viewer.cta_label').toString()" outlined @click="toggle"/>
            <v-media-viewer-wrapper v-bind="$props" />
        </div>
    `,
})

export const Default = Template.bind({})
