import Vue from 'vue'
import { Document } from '@prismicio/client/types/documents'
import MutationType from '~/constants/mutation-type'
import { ProjectData } from '~/types/prismic/app-prismic'

export default Vue.extend({
    data() {
        return {
            projects: [] as Document<ProjectData>[],
        }
    },
    // fetchOnServer: true,
    async fetch() {
        let projects = this.$store.state.projects

        // TODO: Ordering project by date
        // https://prismic.io/docs/technical-reference/prismicio-client?version=v5#query-options

        if (projects?.length) console.log('projects already in state', projects)

        if (!projects) {
            try {
                projects = await this.$prismic.api
                    .query(this.$prismic.predicates.at('document.type', 'project'))
                    .then((response) => response.results)

                this.$store.commit(MutationType.SET_PROJECTS, projects)
                console.log('set project in state', projects)
            } catch (error) {
                console.log('error when loading projects', error)
            }
        }

        this.projects = projects
    },
})
