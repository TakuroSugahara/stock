require('dotenv').config()

const SITE_NAME = '在庫ナビ | マスク最新入荷情報'
const OGP_IMAGE = 'https://zaiko-navi.info/ogp.jpeg'
const OGP_DESC =
  '在庫ナビはマスク・アルコール関連商品などの在庫情報がわかるサイトです。価格が安い順や配送日順で並び替えて比較できるため、あなたにぴったりの商品を探すことができます。入荷情報毎日更新中。'
const FAVI = 'https://zaiko-navi.info/favicon.ico'
const DOMAIN = 'https://zaiko-navi.info'

export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: SITE_NAME,
    title: SITE_NAME,
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, height=device-height, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0'
      },
      {
        hid: 'description',
        name: 'description',
        content: OGP_DESC
      },
      {
        name: 'keywords',
        content:
          'マスク,通販,在庫,販売,新着,比較,アルコール,消毒,ジェル,スプレー'
      },
      { hid: 'og:title', property: 'og:title', content: SITE_NAME },
      { hid: 'og:site_name', property: 'og:site_name', content: SITE_NAME },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: DOMAIN },
      { name: 'og:description', content: OGP_DESC },
      { hid: 'og:image', property: 'og:image', content: OGP_IMAGE },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@Twitter' },
      { name: 'twitter:title', content: SITE_NAME },
      { name: 'twitter:url', content: DOMAIN },
      {
        name: 'twitter:description',
        content: OGP_DESC
      },
      {
        name: 'twitter:image',
        content: OGP_IMAGE
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: FAVI }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/gtm'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/pwa'
  ],

  env: {
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN,
    CTF_ENVIRONMENT: process.env.CTF_ENVIRONMENT
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true
  },

  /*
   ** Proxy module configuration
   */
  proxy: {
    '/api/': {
      target: process.env.BASE_API_URL,
      pathRewrite: {
        '^/api/': '/'
      }
    }
  },

  /*
   ** gtm-module
   ** See https://github.com/nuxt-community/gtm-module
   */
  gtm: {
    dev: false,
    id: 'GTM-KXH58KM'
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        light: {
          primary: '#0B1D43',
          scondary: '#00BFFF',
          accent: '#E3F8FF'
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
