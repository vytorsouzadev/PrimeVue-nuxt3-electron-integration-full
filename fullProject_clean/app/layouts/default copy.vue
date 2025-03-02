<template>
<div id="default-layout" class="border-t border-t-gray-200 shadow-sm flex flex-row h-screen overflow-hidden">
  <!-- Sidebar - max 320px -->
  <div 
    class="px-1 h-full overflow-y-auto flex-shrink-0 transition-all duration-300"
    :class="[sidebarStore.isOpen ? 'w-80 max-w-[330px]' : 'w-18']"
  >
    <!-- <h2 class="p-4">Side Bar {{ sidebarStore.isOpen }}</h2> -->
    <NavSideBarLeft/>
  </div>

  <!-- Main Content - takes remaining space -->
  <div class="p-6 h-full overflow-y-auto flex-1">
    <nuxtPage />
  </div>
</div>
</template>

<script setup>

const sidebarStore = useSidebarStore();
</script>

<style lang="scss" scoped>
.page-enter-active,
.page-leave-active {
transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
opacity: 0;
transform: translateX(10px);
}
</style>