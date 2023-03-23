import MyComponent from '../../../../slices/ProjectListingBlock';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/ProjectListingBlock'
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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{"project":{"id":"mock_document_id","link_type":"Document","type":"mock","tags":[],"lang":"en-us","slug":null,"first_publication_date":"1970-01-01T00:00:01+0000","last_publication_date":"1970-01-01T01:00:00+0000"}}],"primary":{"title":[{"type":"heading2","text":"Score","spans":[]}],"description":[{"type":"paragraph","text":"Duis duis quis proident.","spans":[]}],"display_all_projects":true},"id":"_Default","slice_type":"project_listing_block"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
