import { Context } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'

export default function (context: Context, inject: Inject) {
  inject('asText', (value?: any): string | undefined => {
    if (!value) return
    if (typeof value === 'string') return value
    else return context.$prismic.asText(value)
  })
}
