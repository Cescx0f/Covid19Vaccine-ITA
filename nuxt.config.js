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
  head: {
    title: 'Vaccino COVID19 - Quando tocca a te?',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Calcola quando sarà il tuo turno per ricevere il vaccino.'
      },
      {
        hid: 'google-site-verification',
        name: 'google-site-verification',
        content: 'Mzsdtk8SkIrX2cb5etVTNzOuOjrz2aksLMrHOdnpLG4'
      }
    ]
  },
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
