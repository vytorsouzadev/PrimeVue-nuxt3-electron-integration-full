import { defineNuxtPlugin } from '#app'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import ToastService from 'primevue/toastservice'

// Import PrimeIcons (this is optional since we already imported it in nuxt.config.ts)
import 'primeicons/primeicons.css'

export default defineNuxtPlugin((nuxtApp) => {
  // Configure PrimeVue with theme
  nuxtApp.vueApp.use(PrimeVue, {
    theme: {
      preset: Aura
    },
    
  })
  
  // Install ToastService plugin - this is what was missing
  nuxtApp.vueApp.use(ToastService)
  
  // No need to register components manually - they will be auto-imported
})