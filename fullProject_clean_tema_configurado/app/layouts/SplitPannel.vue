<template>
    <div id="default-layout"> 
           <!-- Main Container with Splitter -->
           <Splitter class="flex-1">
      <SplitterPanel :size="25" class="bg-gray-100">
        <!-- Sidebar -->
        <div class="p-4 h-full overflow-y-auto">
          <NavSideBarLeft/>
        </div>
      </SplitterPanel>
      
      <SplitterPanel :size="75" class="p-0">
        <!-- Main Content -->
        <div class="p-6 h-full overflow-y-auto">
          <nuxtPage />
        </div>
      </SplitterPanel>
    </Splitter>
    </div>
</template>

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