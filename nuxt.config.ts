import i18n from './src/plugins/i18n.config'

require('dotenv').config()
const isDev = process.env.NODE_ENV !== 'production'
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
  loading: false,
  head: {
    title: 'Hive - The Blockchain for Web 3.0',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Fast. Scalable. Powerful.'
      }
    ],
    link: [
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Work+Sans:400,500,700,800,900'
      },
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
    '~/plugins/composition-api',
    '@/plugins/element-ui',
    { src: '@/plugins/tippy', ssr: false }
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
    ['nuxt-i18n', i18n]
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
    extend(config, ctx) {}
  }
}
