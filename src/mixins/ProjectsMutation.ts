import Vue from 'vue'
import {ProjectDocument} from "~/types/prismic/prismic-types.generated";
import MutationType from "~/constants/mutation-type";

export default Vue.extend({
    data() {
        return {
            projects: [] as ProjectDocument[],
        }
    },
    // fetchOnServer: true,
    async fetch() {
        let projects = this.$store.state.projects

        // TODO: Ordering project by date
        // https://prismic.io/docs/technical-reference/prismicio-client?version=v5#query-options

        if (!!projects?.length) console.log('projects already in state', projects)

        if (!projects) {
            try {
                projects = await this.$prismic.api.query(
                    this.$prismic.predicates.at('document.type', 'project')
                ).then((response) => response.results)


                this.$store.commit(MutationType.SET_PROJECTS, projects)
                console.log('set project in state', projects)
            } catch (error) {
                console.log('error when loading projects', error)
            }
        }

        this.projects = projects
    },
})
