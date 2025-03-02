<template>
  <div v-if="debug" class="theme-debugger">
    <div class="theme-status" :class="{ 'theme-loaded': themeStore.themeLoaded }">
      Theme: {{ themeStore.currentTheme.name }}
      <span v-if="themeStore.themeLoaded" class="pi pi-check"></span>
      <span v-else class="pi pi-spin pi-spinner"></span>
    </div>
  </div>
</template>

<script setup>


const themeStore = useThemeStore();
const debug = ref(true); // Set to true to display the debugger

// Watch for theme changes and force a component refresh when theme is loaded
watch(() => themeStore.themeLoaded, (loaded) => {
  if (loaded) {
    // Force component refresh by adding a small delay
    setTimeout(() => {
      // This will trigger a re-render of components that depend on theme variables
      document.documentElement.style.setProperty('--theme-refresh', Date.now().toString());
    }, 100);
  }
});
</script>

<style scoped>
.theme-debugger {
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 9999;
  padding: 5px 10px;
  background: rgba(0,0,0,0.7);
  color: white;
  border-radius: 4px;
  font-size: 12px;
}

.theme-status {
  display: flex;
  align-items: center;
  gap: 5px;
}

.theme-loaded {
  color: #10B981;
}
</style>
