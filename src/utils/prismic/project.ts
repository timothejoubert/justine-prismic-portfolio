import type { Route } from 'vue-router'
import NodeUid from '~/constants/node-uid'

export const getProjectUid = (route: Route['params']): string | false => {
    const path = route?.pathMatch?.split('/')
    const isProjectsRoute = path?.[0] === NodeUid.PROJECT_LISTING
    return isProjectsRoute ? path?.[path?.length - 1] : false
}
