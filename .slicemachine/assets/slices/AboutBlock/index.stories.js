import MyComponent from '../../../../slices/AboutBlock';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/AboutBlock'
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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{}],"primary":{"title":"beside","content":[{"type":"paragraph","text":"Laborum reprehenderit ullamco dolor non occaecat Lorem fugiat elit aliquip laborum esse.","spans":[]}],"media":{"dimensions":{"width":3648,"height":4560},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2"},"link":{"id":"mock_document_id","link_type":"Document","type":"page","tags":[],"lang":"en-us","slug":null,"first_publication_date":"1970-01-01T00:00:01+0000","last_publication_date":"1970-01-01T01:00:00+0000"}},"id":"_Default","slice_type":"about_block"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
