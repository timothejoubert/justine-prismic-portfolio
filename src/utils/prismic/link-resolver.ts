export default function linkResolver(doc: any) {
  switch (doc.type) {
    case 'project':
      return `/projects/${doc.uid}`
    case 'page':
      return doc.uid === 'home-page' ? '/' : `/${doc.uid}`
    default:
      return '/'
  }
}
