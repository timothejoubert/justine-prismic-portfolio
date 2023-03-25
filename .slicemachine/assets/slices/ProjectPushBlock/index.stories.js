import MyComponent from '../../../../slices/ProjectPushBlock';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/ProjectPushBlock'
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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{}],"primary":{"title":"driving","description":[{"type":"paragraph","text":"Ullamco nulla in esse.","spans":[]}],"project":{"id":"mock_document_id","link_type":"Document","type":"project","tags":[],"lang":"en-us","slug":null,"first_publication_date":"1970-01-01T00:00:01+0000","last_publication_date":"1970-01-01T01:00:00+0000"},"cta_label":"end"},"id":"_Default","slice_type":"project_push"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
