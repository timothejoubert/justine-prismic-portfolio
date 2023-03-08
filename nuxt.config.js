import sm from './sm.json'
import { version } from './package.json'
// @ts-ignore
import SpriteLoaderPlugin from 'svg-sprite-loader/plugin'
import { Configuration as WebpackConfiguration } from 'webpack'
import createSitemap from './src/utils/create-sitemap'
import prismicHtmlSerializer from './src/utils/prismic-html-serializer'
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
      lang: 'fr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'fallback description content'
      },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'version', name: 'version', content: version || '' }
    ],
    link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }]
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/prismic',
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://github.com/nuxt/postcss8
    '@nuxt/postcss8',
    // https://github.com/nuxt-community/svg-module
    '@nuxtjs/svg',
    // https://github.com/nuxt-community/style-resources-module#setup
    '@nuxtjs/style-resources'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://sitemap.nuxtjs.org/guide/setup
    '@nuxtjs/sitemap'
  ],

  // https://sitemap.nuxtjs.org/guide/setup
  sitemap: {
    hostname: process.env.APP_URL || 'http://localhost:3000',
    // i18n: true,
    path: '/sitemap.xml',
    cacheTime: 1000 * 60 * 60 * 20,
    defaults: {
      changefreq: 'daily',
      lastmod: new Date()
    },
    sitemaps: createSitemap()
  },

  // https://github.com/nuxt-community/svg-module
  svg: {
    svgSpriteLoader: {
      extract: true,
      runtimeGenerator: require.resolve('./src/utils/svg/sprite-component-generator.js'),
      spriteFilename: 'image/sprite.[hash:8].svg'
    }
  },

  // https://nuxtjs.org/deployments/netlify/
  // Redirect to custom Error layout in SPA mode
  generate: {
    fallback: true
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/scss/main',
    '@/styles/global.css',
    '@fontsource/inter/400.css',
    '@fontsource/inter/500.css',
    '@fontsource/inter/600.css'
  ],

  // https://github.com/nuxt-community/style-resources-module#setup
  // can access @include... in all files
  styleResources: {
    scss: ['@/scss/_style-resources.scss'],
    hoistUseStatements: true
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: ['@/components', '@/components/atoms', '@/components/molecules', '@/components/organisms'],

  publicRuntimeConfig: {
    development: process.env.NODE_ENV === 'development',
    siteUrl: process.env.APP_URL,
    apiUrl: sm.apiEndpoint || process.env.LOCAL_API_URL
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/gsap.client.ts'],

  prismic: {
    endpoint: sm.apiEndpoint,
    modern: true,
    linkResolver: (doc) => {
      switch (doc.type) {
        case 'page':
          return doc.uid === 'home' ? '/' : `/${doc.uid}`
        default:
          return '/'
      }
    },
    htmlSerializer(type, element, content, children) { prismicHtmlSerializer(type, element, content, children) }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      css: {
        modules: {
          compileType: 'icss'
        }
      },
      cssModules: {
        modules: {
          localIdentName: isProduction ? '[local]_[hash:base64:5]' : '[name]__[local]--[hash:base64:5]'
        }
      }
    },
    plugins: [
      new SpriteLoaderPlugin({
        plainSprite: true,
        spriteAttrs: {
          id: 'svg-sprite'
        }
      })
    ],
    // fix broken styles during live editing into dev tools https://github.com/vuejs-templates/webpack/issues/1331
    cssSourceMap: false,
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {}
      }
    },
    transpile: ['@prismicio/vue', 'gsap'],
    // extend(config: WebpackConfiguration) {
    //   config.module?.rules.push({
    //     test: /\.mjs$/,
    //     include: /node_modules/,
    //     type: 'javascript/auto'
    //   })
    // }
    // load files with mjs extension
    // https://github.com/vuejs/pinia/issues/675#issuecomment-945602370
  }
}
