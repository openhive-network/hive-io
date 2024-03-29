import {Configuration, IgnorePlugin} from 'webpack'
import i18n from './src/plugins/i18n.config'

require('dotenv').config()
const isDev = process.env.NODE_ENV !== 'production'
const env = {
  GA_ID: process.env.GA_ID || 'UA-000000-1',
  GTM_ID: process.env.GTM_ID || 'GTM-0000000',
}
export default {
  modern: !isDev,
  srcDir: './src/',
  rootDir: './',
  target: 'static',
  /*
   ** Headers of the page
   */
  server: {
    host: '0.0.0.0',
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
      author: 'Hive - The Blockchain & Cryptocurrency for Web3',
      name: 'Hive - The Blockchain & Cryptocurrency for Web3',
      ogTitle: 'Hive - The Blockchain & Cryptocurrency for Web3',
      ogSiteName: 'Hive - The Blockchain & Cryptocurrency for Web3',
      description:
        'Hive is a DPoS powered blockchain & cryptocurrency. Fast. Scalable. Powerful. Hive has a thriving ecosystem of dapps, communities & individuals.',
      keywords: 'hive, web3, blockchain, social blockchain, web3 blockchain, web3 social media, nfts, tokens, hbd, cryptocurrency',
      ogType: 'website',
      ogUrl: 'https://hive.io',
      ogHost: 'https://hive.io',
      ogImage: '/opengraph.png',
      twitterCard: 'summary_large_image',
    },
  },
  components: true,
  loading: false,
  head: {
    // titleTemplate: '%s - Nuxt.js', <= for testing
    link: [
      // {
      //   rel: 'stylesheet',
      //   href:
      //     'https://fonts.googleapis.com/css?family=Work+Sans:400,500,700&display=swap',
      // },
      {rel: 'icon', type: 'image/x-icon', href: '/favicons/favicon.ico'},
    ],
  },
  /*
   ** Global CSS
   */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    {src: '@assets/css/main.scss', lang: 'scss'},
  ],
  styleResources: {
    scss: ['./assets/css/variables.scss'],
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    // '@/plugins/composition-api',
    '@/plugins/element-ui',
    {src: '@/plugins/tippy', ssr: false},
    '@/plugins/fontawesome',
    {src: '@/plugins/vue-modal', ssr: true},
  ],
  generate: {
    routes: ['/'],
    // Has to be there due to Nuxt Composition API & Typescript
    interval: 1000,
    fallback: 'index.html',
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    'nuxt-typed-vuex',
    '@nuxtjs/composition-api/module',
    ['@nuxtjs/router', {}],
    // ['@nuxtjs/google-fonts', {families: {'Work+Sans': true}}],
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    'nuxt-client-init-module',
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
        id: env.GA_ID,
      },
    ],
    // Gzip/Brotli Compression
    [
      'nuxt-compress',
      {
        gzip: {
          test: /\.(js|css|html|svg)$/,
          cache: true,
        },
        brotli: {
          test: /\.(js|css|html|svg)$/,
          threshold: 0,
        },
      },
    ],
    '@nuxtjs/gtm',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    debug: isDev,
    retry: {retries: 3},
    withCredentials: true,
  },
  gtm: {
    id: env.GTM_ID,
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/, /typed-vuex/],
    /*
     ** You can extend webpack config here
     */
    extend(config: Configuration, {isClient}) {
      if (!isDev && isClient) {
        if (config.optimization) {
          config.optimization.minimize = true
          config.optimization.splitChunks = {}
        }

        if (config.plugins) {
          config.plugins.push(new IgnorePlugin(/^\.\/locale$/, /moment$/))
        }
      }
    },
  },
}
