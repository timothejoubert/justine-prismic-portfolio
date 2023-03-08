import MyComponent from '../../../../../slices/SketchBook';
import SliceZone from 'vue-slicezone'

export default {
  title: 'src/slices/SketchBook'
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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{}],"primary":{"title":[{"type":"heading1","text":"Piece","spans":[]}],"description":[{"type":"paragraph","text":"Occaecat velit dolore id qui qui ut esse et voluptate incididunt non enim elit. Dolor non magna ad ex commodo exercitation fugiat fugiat laborum voluptate esse aliquip aute. Fugiat ullamco eu ad excepteur magna consequat nulla mollit nulla nostrud labore cupidatat amet aute nisi.","spans":[]}]},"id":"_Default","slice_type":"sketch_book"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
