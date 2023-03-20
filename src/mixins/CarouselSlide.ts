import Vue from 'vue'
import type { VueConstructor } from 'vue'
import { Inject } from '~/components/organisms/VCarousel/VCarousel.vue'

export default (Vue as VueConstructor<Vue & Inject>).extend({
    inject: {
        registerSlide: {
            default() {},
        },
    },
    mounted() {
        this.registerSlide?.()
    },
})
