export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('animate', {
    mounted(el, binding) {
      // Add the base animate class
      el.classList.add('animate__animated')
      
      // Add the specific animation class if provided
      if (binding.value) {
        el.classList.add(`animate__${binding.value}`)
      }
      
      // Handle modifiers like delay, speed, etc.
      if (binding.modifiers) {
        Object.keys(binding.modifiers).forEach(modifier => {
          if (modifier.startsWith('delay-')) {
            el.classList.add(`animate__${modifier}`)
          } else if (['faster', 'fast', 'slow', 'slower'].includes(modifier)) {
            el.classList.add(`animate__${modifier}`)
          } else if (modifier === 'infinite') {
            el.classList.add('animate__infinite')
          }
        })
      }
    }
  })
})
