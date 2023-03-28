import Vue from 'vue'

export interface Inject {
    registerSlide(): void
}

export default Vue.extend({
    provide(): Inject {
        return {
            registerSlide: this.registerSlide,
        }
    },
    props: {
        asyncSlides: Boolean,
    },
    data() {
        return {
            numSlides: 0,
            initialized: false,
        }
    },
    watch: {
        numSlides() {
            this.checkIfSlidesAreReady()
        },
    },
    mounted() {
        if (this.asyncSlides) {
            this.checkIfSlidesAreReady()
        } else {
            this.initialized = true
            this.init()
        }
    },
    methods: {
        checkIfSlidesAreReady() {
            if (this.$children.length === this.$slots.default?.length && !this.initialized) {
                this.initialized = true
                this.$nextTick(this.init)
            }
        },
        registerSlide() {
            this.numSlides++
        },
        init() {},
    },
})
