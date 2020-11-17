import { Configuration, IgnorePlugin } from 'webpack'
import i18n from './src/plugins/i18n.config'

require('dotenv').config()
const isDev = process.env.NODE_ENV !== 'production'
const env = {
  GA_ID: process.env.GA_ID || 'UA-000000-1'
}
export default {
  modern: !isDev,
  mode: 'universal',
  srcDir: './src/',
  rootDir: './',
  /*
   ** Headers of the page
   */
  server: {
    host: '0.0.0.0'
  },
  /* manifest: {
    name: env.appData.name,
    short_name: env.appData.name,
    description: env.appData.slogan,
    theme_color: '#188269',
  }, */
  pwa: {
    meta: {
      charset: 'utf-8',
      author: 'Hive - The Ecosystem & Cryptocurrency for Web 3.0',
      name: 'Hive - The Ecosystem & Cryptocurrency for Web 3.0',
      ogTitle: 'Hive - The Ecosystem & Cryptocurrency for Web 3.0',
      ogSiteName: 'Hive - The Ecosystem & Cryptocurrency for Web 3.0',
      description:
        'Hive is a DPoS-powered blockchain & cryptocurrency. Fast. Scalable. Powerful. Hive has a thriving ecosystem of dapps, communities & individuals.',
      ogType: 'website',
      ogUrl: 'https://hive.io',
      ogHost: 'https://hive.io',
      ogImage: '/opengraph.png',
      twitterCard: 'summary_large_image'
    }
  },
  loading: false,
  head: {
    // titleTemplate: '%s - Nuxt.js', <= for testing
    link: [
      /* {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Work+Sans:400,500,700,800,900&display=swap'
      }, */
      { rel: 'icon', type: 'image/x-icon', href: '/favicons/favicon.ico' }
    ]
  },
  /*
   ** Global CSS
   */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    { src: '@assets/css/main.scss', lang: 'scss' }
  ],
  styleResources: {
    scss: ['./assets/css/variables.scss']
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/composition-api',
    '@/plugins/element-ui',
    { src: '@/plugins/tippy', ssr: false },
    '@/plugins/fontawesome'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    'nuxt-typed-vuex'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
    ['nuxt-i18n', i18n],
    [
      '@nuxtjs/google-analytics',
      {
        id: env.GA_ID
      }
    ],
    // Gzip/Brotli Compression
    [
      'nuxt-compress',
      {
        gzip: {
          test: /\.(js|css|html|svg)$/,
          cache: true
        },
        brotli: {
          test: /\.(js|css|html|svg)$/,
          threshold: 0
        }
      }
    ]
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    debug: isDev,
    retry: { retries: 3 },
    withCredentials: true
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/, /typed-vuex/],
    /*
     ** You can extend webpack config here
     */
    extend(config: Configuration, { isClient }) {
      if (!isDev && isClient) {
        if (config.optimization) {
          config.optimization.minimize = true
          config.optimization.splitChunks = {}
        }

        if (config.plugins) {
          config.plugins.push(new IgnorePlugin(/^\.\/locale$/, /moment$/))
        }
      }
    }
  }
}
