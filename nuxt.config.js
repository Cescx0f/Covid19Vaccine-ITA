module.exports = {
  /*
  ** Build configuration
  */
  build: {},
  buildModules: [
    '@nuxt/typescript-build',
    ['@nuxtjs/vuetify', { defaultAssets: false }]
  ],
  /*
  ** Headers
  ** Common headers are already provided by @nuxtjs/pwa preset
  */
  head: {},
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Customize app manifest
  */
  manifest: {
    theme_color: '#3B8070'
  },
  /*
  ** Modules
  */


  modules: [
    '@nuxtjs/pwa'
  ],
  pwa: {
    meta: {
      name: 'Vaccino COVID19'
    }
  }
}
