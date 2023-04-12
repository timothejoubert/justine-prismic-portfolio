// switch (doc.type) {
//     case 'project':
//         return `/projects/${doc.uid}`
//     case 'page':
//         return doc.uid === 'home-page' ? '/' : `/${doc.uid}`
//     default:
//         return '/'
// }

export default function linkResolver(doc: any) {
    switch (doc.uid) {
        case 'home-page':
            return '/'
        default:
            return `/${doc.uid}`
    }
}
