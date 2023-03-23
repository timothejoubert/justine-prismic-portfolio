import MyComponent from '../../../../slices/ContactBlock';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/ContactBlock'
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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{}],"primary":{"title":[{"type":"heading1","text":"Business","spans":[]}],"description":[{"type":"paragraph","text":"Lorem sint incididunt quis mollit proident nisi excepteur sit amet in pariatur non.","spans":[]}],"contact":"clothes","display_socials":false},"id":"_Default","slice_type":"contact_block"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
