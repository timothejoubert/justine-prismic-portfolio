// @ts-ignore
import SpriteLoaderPlugin from 'svg-sprite-loader/plugin'
import sm from './sm.json'
import { version } from './package.json'
import createSitemap from './src/utils/create-sitemap'
// import { prismicHtmlSerializer } from './src/utils/prismic-html-serializer'
// import { Configuration as WebpackConfiguration } from 'webpack'

const isProduction = process.env.NODE_ENV === 'production'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // define if this file isn't same folder as nuxt front folder
  // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-srcdir
  srcDir: 'src',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Prismic + Nuxt multi-page example',
    htmlAttrs: {
      lang: 'fr',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'fallback description content',
      },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'version', name: 'version', content: version || '' },
    ],
    link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/prismic',
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://image.nuxtjs.org/getting-started/installation
    '@nuxt/image',
    // https://github.com/nuxt/postcss8
    '@nuxt/postcss8',
    // https://github.com/nuxt-community/svg-module
    '@nuxtjs/svg',
    // https://github.com/nuxt-community/style-resources-module#setup
    '@nuxtjs/style-resources',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://sitemap.nuxtjs.org/guide/setup
    '@nuxtjs/sitemap',
  ],

  // https://sitemap.nuxtjs.org/guide/setup
  sitemap: {
    hostname: process.env.APP_URL || 'http://localhost:3000',
    // i18n: true,
    path: '/sitemap.xml',
    cacheTime: 1000 * 60 * 60 * 20,
    defaults: {
      changefreq: 'daily',
      lastmod: new Date(),
    },
    sitemaps: createSitemap(),
  },

  // https://github.com/nuxt-community/svg-module
  svg: {
    svgSpriteLoader: {
      extract: true,
      runtimeGenerator: require.resolve('./src/utils/svg/sprite-component-generator.js'),
      spriteFilename: 'image/sprite.[hash:8].svg',
    },
  },

  // https://nuxtjs.org/deployments/netlify/
  // Redirect to custom Error layout in SPA mode
  generate: {
    fallback: true,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/scss/main'],

  // https://github.com/nuxt-community/style-resources-module#setup
  // can access @include... in all files
  styleResources: {
    scss: ['@/scss/_style-resources.scss'],
    hoistUseStatements: true,
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: ['@/components', '@/components/atoms', '@/components/molecules', '@/components/organisms'],

  publicRuntimeConfig: {
    development: process.env.NODE_ENV === 'development',
    siteUrl: process.env.APP_URL,
    apiUrl: sm.apiEndpoint || process.env.API_URL,
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/gsap.client.ts', '~/plugins/prismic-utils.ts'],

  prismic: {
    preview: '/preview',
    endpoint: sm.apiEndpoint,
    modern: true,
    linkResolver: (doc) => {
      switch (doc.type) {
        case 'page':
          // return doc.uid === 'home' ? '/' : `/${doc.uid}`
          return doc.uid === 'home-page' ? '/' : `/${doc.uid}`
        case 'project':
          return `/projects/${doc.uid}`
        default:
          return '/'
      }
    },
    htmlSerializer(type, element, _content, children) {
      switch (type) {
        case 'heading1':
          return /* html */ `<h1 class="font-semibold leading-tight tracking-tight md:leading-tight text-4xl md:text-5xl mb-7 mt-12 first:mt-0 last:mb-0">${children.join(
            ''
          )}</h1>`

        case 'heading2':
          return /* html */ `<h2 class="font-semibold leading-tight tracking-tight md:leading-tight text-3xl md:text-4xl mb-7 mt-12 first:mt-0 last:mb-0">${children.join(
            ''
          )}</h2>`

        case 'heading3':
          return /* html */ `<h3 class="font-semibold leading-tight tracking-tight md:leading-tight text-xl md:text-2xl mb-7 mt-12 first:mt-0 last:mb-0">${children.join(
            ''
          )}</h3>`

        case 'paragraph':
          return /* html */ `<p class="mb-7 last:mb-0">${children.join('')}</p>`

        case 'group-o-list-item':
          return /* html */ `<ol class="mb-7 pl-4 last:mb-0 md:pl-6">${children.join('')}</ol>`

        case 'o-list-item':
          return /* html */ `<li class="mb-1 list-decimal pl-1 last:mb-0 md:pl-2">${children.join('')}</li>`

        case 'group-list-item':
          return /* html */ `<ul class="mb-7 pl-4 last:mb-0 md:pl-6">${children.join('')}</ul>`

        case 'list-item':
          return /* html */ `<li class="mb-1 list-disc pl-1 last:mb-0 md:pl-2">${children.join('')}</li>`

        case 'preformatted':
          return /* html */ `<pre class="mb-7 rounded bg-slate-100 p-4 text-sm last:mb-0 md:p-8 md:text-lg">
                <code>${children.join('')}</code>
            </pre>`

        case 'strong':
          return /* html */ `<strong class="font-semibold">${children.join('')}</strong>`

        case 'hyperlink':
          return /* html */ `<a href="${
            element.data.url
          }" class="underline decoration-1 underline-offset-2">${children.join('')}</a>`

        default:
          return null
      }
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      css: {
        modules: {
          compileType: 'icss',
        },
      },
      cssModules: {
        modules: {
          localIdentName: isProduction ? '[local]_[hash:base64:5]' : '[name]__[local]--[hash:base64:5]',
        },
      },
    },
    plugins: [
      new SpriteLoaderPlugin({
        plainSprite: true,
        spriteAttrs: {
          id: 'svg-sprite',
        },
      }),
    ],
    // fix broken styles during live editing into dev tools https://github.com/vuejs-templates/webpack/issues/1331
    cssSourceMap: false,

    transpile: ['@prismicio/vue', 'gsap'],
    // load files with mjs extension
    // https://github.com/vuejs/pinia/issues/675#issuecomment-945602370
    // extend(config: WebpackConfiguration) {
    //   config.module?.rules.push({
    //     test: /\.mjs$/,
    //     include: /node_modules/,
    //     type: 'javascript/auto'
    //   })
    // }
  },
}
