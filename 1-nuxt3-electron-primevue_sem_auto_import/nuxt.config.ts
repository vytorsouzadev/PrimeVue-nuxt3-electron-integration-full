// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  // Register the plugin
  plugins: [
    '~/plugins/primevue.ts'
  ],
  
  // Make sure PrimeVue is properly transpiled
  build: {
    transpile: ['primevue']
  }
})
