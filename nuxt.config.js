export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Monster Hunter Rise Set Builder',
    titleTemplate: '%s - Monster Hunter Rise Set Builder',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Generate, build and compare weapons and armors in Monster Hunter Rise'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: []
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/emitter.js',
    '~/plugins/click-outside.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://github.com/LinusBorg/portal-vue
    'portal-vue/nuxt',
    // https://sitemap.nuxtjs.org/
    '@nuxtjs/sitemap'
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    },
    meta: {
      name: 'Monster Hunter Rise Set Builder',
      description: 'Generate, build and compare weapons and armors in Monster Hunter Rise'
    }
  },

  content: {
    fullTextSearchFields: ['name', 'skill'],
    nestedProperties: ['skills.name', 'skills.slug', 'elements.type']
  },

  // Sitemap module configuration: https://sitemap.nuxtjs.org/guide/configuration
  sitemap: {
    hostname: 'https://mhr-builder.com',
    routes () {
      const { $content } = require('@nuxt/content')
      return $content('sets')
        .only(['path'])
        .fetch()
        .then(files => files.map(file => file.path))
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
