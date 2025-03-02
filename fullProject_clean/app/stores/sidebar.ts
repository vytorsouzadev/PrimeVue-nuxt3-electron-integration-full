export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    isOpen: true
  }),
  actions: {
    toggle() {
      this.isOpen = !this.isOpen
    }
  }
})
