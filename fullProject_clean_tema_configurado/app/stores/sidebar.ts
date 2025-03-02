import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    isOpen: true
  }),
  actions: {
    toggle() {
      this.isOpen = !this.isOpen
      // Save to localStorage whenever the state changes
      localStorage.setItem('sidebar-state', JSON.stringify(this.isOpen))
    },
    
    initSidebar() {
      // Get saved state from localStorage on initialization
      const savedState = localStorage.getItem('sidebar-state')
      
      if (savedState !== null) {
        // Use the saved state if it exists
        this.isOpen = JSON.parse(savedState)
      } else {
        // Default to closed if no saved state
        this.isOpen = false
        // Save the default state
        localStorage.setItem('sidebar-state', JSON.stringify(this.isOpen))
      }
    }
  }
})