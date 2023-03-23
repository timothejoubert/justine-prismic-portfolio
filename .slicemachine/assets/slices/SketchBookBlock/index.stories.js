import MyComponent from '../../../../slices/SketchBook';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/SketchBook'
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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{"media":{"dimensions":{"width":5243,"height":3495},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1496181133206-80ce9b88a853"},"name":"upper"}],"primary":{},"id":"_Default","slice_type":"sketch_book"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
