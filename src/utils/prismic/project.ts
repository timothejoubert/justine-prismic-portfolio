import type { Route } from 'vue-router'
import NodeUid from '~/constants/node-uid'
import { ProjectDocument } from '~/types/prismic/app-prismic'

export const getProjectUid = (route: Route['params']): string | false => {
    const path = route?.pathMatch?.split('/')
    const isProjectsRoute = path?.[0] === NodeUid.PROJECT_LISTING
    return isProjectsRoute ? path?.[path?.length - 1] : false
}

export const getProjectByUid = (projects: ProjectDocument[], uid: string): ProjectDocument | undefined => {
    return projects?.find((project) => project.uid === uid)
}

export const hasProjectByUid = (projects: ProjectDocument[], uid: string) => {
    return projects?.some((project) => project.uid === uid)
}
