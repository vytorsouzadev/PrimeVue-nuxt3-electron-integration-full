import { defineNuxtPlugin } from '#app'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

// Import specific components you need (optional - for tree shaking)
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Paginator from 'primevue/paginator';

import ImageCompare from 'primevue/imagecompare';

import Card from 'primevue/card';


// Add more components as needed

export default defineNuxtPlugin((nuxtApp) => {
  // Configure PrimeVue with theme
  nuxtApp.vueApp.use(PrimeVue, {
    theme: {
      preset: Aura
    }
  })
  
  // Register components globally (optional)
  nuxtApp.vueApp.component('PButton', Button)
  nuxtApp.vueApp.component('PDataTable', DataTable)
  nuxtApp.vueApp.component('PColumn', Column)
  nuxtApp.vueApp.component('Paginator', Paginator)
  nuxtApp.vueApp.component('ImageCompare', ImageCompare)
  nuxtApp.vueApp.component('Card', Card)
  // Register more components as needed
})
