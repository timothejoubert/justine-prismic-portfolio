import { Document } from '@prismicio/client/types/documents'
import NodeUid from '../../constants/node-uid'
// import CustomType from '../../constants/custom-type'

export default function linkResolver({ uid }: Document) {
    if (uid === NodeUid.HOME) return '/'
    // if (type === CustomType.PROJECT) return `/${NodeUid.PROJECT_LISTING}/${uid}`

    return `/${uid}`
}
