import Vue from 'vue'
import type { PropType } from 'vue'
import { PageDocumentData } from "~/types/prismic-types.generated";

export default Vue.extend({
    props: {
        pageData: Object as PropType<PageDocumentData>
    },
})
