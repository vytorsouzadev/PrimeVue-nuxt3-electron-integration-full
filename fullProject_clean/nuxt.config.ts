// https://nuxt.com/docs/api/configuration/nuxt-config
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  // como tudo está na pasta App
  //vou configurar o diretorio padrao pra lá
  srcDir: 'app/',
    // Adicione isso para configurar o indicador de carregamento global
    app: {
      pageTransition: { name: 'page', mode: 'out-in' },
      // Também pode adicionar o indicador de carregamento
      layoutTransition: { name: 'layout', mode: 'out-in' }
    },

  modules: [
    '@nuxtjs/tailwindcss', 
    '@pinia/nuxt', 
    '@vueuse/nuxt'],
    css: [
      '~/assets/css/main.scss',
      'animate.css',
      // 'primevue/resources/themes/lara-light-blue/theme.css',  // Tema base do PrimeVue
      // 'primevue/resources/primevue.min.css',                  // Core CSS do PrimeVue
      'primeicons/primeicons.css'                            // Ícones do PrimeVue
    ],
  // Register the plugin for basic PrimeVue setup
  plugins: [
    '~/plugins/primevue.ts',
    '~/plugins/animate.ts'
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