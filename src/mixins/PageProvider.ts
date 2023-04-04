import Vue from 'vue'
import type { PropType } from 'vue'
import { MainPageData } from '~/types/prismic/app-prismic'

export default Vue.extend({
    props: {
        pageData: Object as PropType<MainPageData>,
    },
})
