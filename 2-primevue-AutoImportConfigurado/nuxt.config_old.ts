// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
    // Use the Tailwind module instead of manual configuration
  modules: ['@nuxtjs/tailwindcss'],
  css:[
    '~/assets/css/main.css'
  ],
  // Register the plugin
  plugins: [
    '~/plugins/primevue.ts'
  ],
  // Make sure PrimeVue is properly transpiled
  build: {
    transpile: ['primevue']
  }
})
