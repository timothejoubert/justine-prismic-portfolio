<script lang="ts">
import Vue from 'vue'
import type { PropType, VNode } from 'vue'
import type { ImageField } from '@prismicio/types'
import { isMediaFulled } from '~/utils/prismic/field-media'

const FALLBACK_ALT = 'Illustration de justine saez'

export default Vue.extend({
    name: 'VImage',
    props: {
        prismicImage: {
            type: Object as PropType<ImageField>,
            required: true,
        },
        nativeImg: Boolean,
        url: String,
        placeholder: { type: Boolean, default: true },
    },
    data() {
        return {
            loaded: false,
        }
    },
    render(createElement): VNode | undefined {
        const { prismicImage, nativeImg, url } = this.$props
        if (!prismicImage || (prismicImage && !isMediaFulled(prismicImage))) return undefined

        const { url: prismicImageSrc, alt, copyright } = prismicImage

        const nuxtImageAttributes: Record<string, any> = {}

        if (!nativeImg) {
            nuxtImageAttributes.placeholder = '15'
            nuxtImageAttributes.format = 'webp'
            nuxtImageAttributes.provider = 'prismic'
            nuxtImageAttributes.quality = '80'
            nuxtImageAttributes.sizes = this.$attrs?.sizes || 'xs:60vw md:60vw lg:60vw vl:60vw xl:60vw xxl:60vw hd:60vw'
        }

        const attrs = {
            src: (nativeImg ? url : prismicImageSrc) || '/images/share.jpg',
            copyright,
            alt: alt || FALLBACK_ALT,
            ...nuxtImageAttributes,
        }

        return createElement(nativeImg ? 'img' : 'nuxt-img', {
            attrs,
            class: [this.$style.root, this.loaded && this.$style['root--loaded']],
            on: { load: () => (this.loaded = true) },
        })
    },
})
</script>

<style lang="scss" module>
.root {
    &--loaded {
        //border: 1px solid black;
    }
}
</style>
