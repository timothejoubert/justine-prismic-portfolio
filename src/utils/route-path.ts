import type { Route } from 'vue-router'

export const isHomePath = (route: Route) => {
    return route.fullPath === process.env.HOME_PATH || route.path === process.env.HOME_PATH
}
