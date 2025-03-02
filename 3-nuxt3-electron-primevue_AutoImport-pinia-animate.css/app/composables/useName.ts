import { defineStore } from 'pinia';

export const useNameStore = defineStore('name', {
  state: () => ({
    appName: 'Nuxt3 and Electron App',
  }),
  
  actions: {
    setAppName(newName: string) {
      this.appName = newName
    },
    
    resetAppName() {
      this.appName = 'Nuxt3 and Electron App'
    }
  },
  
  getters: {
    getAppName: (state) => state.appName,
    
    // Add a getter that returns the app name with a suffix, as an example
    getAppNameWithVersion: (state) => `${state.appName} v0.0.1`
  }
})

// Create a composable wrapper for easier access
export function useName() {
  const nameStore = useNameStore()
  
  return {
    appName: computed(() => nameStore.appName),
    getAppNameWithVersion: computed(() => nameStore.getAppNameWithVersion),
    setAppName: nameStore.setAppName,
    resetAppName: nameStore.resetAppName
  }
}
