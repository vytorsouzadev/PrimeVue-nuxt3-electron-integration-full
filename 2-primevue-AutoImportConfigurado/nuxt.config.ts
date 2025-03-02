// https://nuxt.com/docs/api/configuration/nuxt-config
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  // Use the Tailwind module instead of manual configuration
  modules: ['@nuxtjs/tailwindcss'],
  css: [
    '~/assets/css/main.css'
  ],
  // Register the plugin for basic PrimeVue setup
  plugins: [
    '~/plugins/primevue.ts'
  ],
  // Make sure PrimeVue is properly transpiled
  build: {
    transpile: ['primevue']
  },
  // Configure Vite plugins for component auto-import
  vite: {
    plugins: [
      Components({
        resolvers: [
          PrimeVueResolver()
        ]
      })
    ]
  }
})
