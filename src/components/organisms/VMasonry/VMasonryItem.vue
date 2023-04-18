<script lang="ts">
import Vue from 'vue'
import type { VNode, VueConstructor } from 'vue'
import { Inject } from '~/components/organisms/VMasonry/VMasonry.vue'

export default (Vue as VueConstructor<Vue & Inject>).extend({
    name: 'VMasonryItem',
    inject: ['registerMasonryItem', 'unregisterMasonryItem'],
    props: {
        fixed: Boolean,
    },
    created() {
        this.registerMasonryItem(this)
    },
    beforeDestroy() {
        this.unregisterMasonryItem(this)
    },
    render(createElement): VNode {
        return this.$slots.default?.[0] || createElement('')
    },
})
</script>
