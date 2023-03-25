import MyComponent from '../../../../slices/RandomGridImageBlock';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/RandomGridImageBlock'
}


export const _Default = () => ({
  components: {
    MyComponent,
    SliceZone
  },
  methods: {
    resolve() {
      return MyComponent
    }
  },
  data() {
    return {
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{"image":{"dimensions":{"width":3168,"height":4752},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1589321599763-d66926c29613"}}],"primary":{},"id":"_Default","slice_type":"loading_image"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
