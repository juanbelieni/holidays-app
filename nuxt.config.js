export default {
  head: {
    titleTemplate: '%s - Holidays',
    title: 'Holidays',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: [],

  plugins: [],

  components: true,

  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify'],

  modules: ['@nuxtjs/axios', '@nuxtjs/pwa', '@nuxtjs/proxy'],

  axios: {
    proxy: true,
  },

  proxy: {
    '/api': {
      target: 'https://date.nager.at/Api/v2',
      pathRewrite: { '^/api': '/' },
    },
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {},
  },

  build: {},
}
