import MyComponent from '../../../../../src/slices/Socials';
import SliceZone from 'vue-slicezone'

export default {
  title: 'src/slices/Socials'
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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{"name":"advice","link":{"link_type":"Web","url":"https://prismic.io"}}],"primary":{},"id":"_Default","slice_type":"socials"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
