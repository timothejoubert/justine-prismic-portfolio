import Vue from 'vue'
import { joinURL } from 'ufo'
import { MenuItem } from '~/types/prismic/app-prismic'
import { isInternalRelationLinkWithUidFulled } from '~/utils/prismic/field-relation'
import NodeUid from '~/constants/node-uid'

export default Vue.extend({
    computed: {
        breadcrumbJsonldB(): Record<string, unknown> | undefined {
            if (!this.pages || this.pages.length < 2) return

            return {
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: this.pages.map((item: MenuItem, index: number) => {
                    const element: { '@type': string; position: number; name: string; item?: string } = {
                        '@type': 'ListItem',
                        position: index + 1,
                        name: item.label || 'Page label',
                    }

                    if (isInternalRelationLinkWithUidFulled(item.link) && item.link.uid)
                        element.item = joinURL(
                            this.$config.siteUrl,
                            item.link.uid === NodeUid.HOME ? '' : item.link.uid
                        )

                    return element
                }),
            }
        },
        websiteInfos(): Record<string, unknown> {
            return {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: this.$config.siteName,
                alternateName: this.$config.siteName?.replace(/\s/g, '') || '',
                url: this.$config.siteUrl,
            }
        },
    },
})
