import { Context } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'

export default function (context: Context, inject: Inject) {
    inject('asText', (richText?: any, _joinString?: string): string | undefined => {
        if (!richText) return
        if (typeof richText === 'string') return richText
        else return context.$prismic.asText(richText)
    })
}
