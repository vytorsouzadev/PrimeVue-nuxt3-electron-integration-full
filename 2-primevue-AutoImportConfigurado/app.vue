<template>
  <div class="flex flex-col h-screen">
       <!-- Global Toast container -->
       <Toast position="top-right" />
       <!--toast foi colocado como global para ser utilizado em qualquer lugar do projeto-->
       <!-- se colocar ele direto em uma page ou componet tava dando Erro! -->
    <!-- Top Navbar with PrimeVue Toolbar -->
    <Toolbar class="bg-gray-800 shadow-md">
      <template #start>
        <h1 class="text-xl text-center text-blue-300 font-semibold">Nuxt3 and ElectronJS - Simple IPC-Communication Project</h1>
      </template>
    </Toolbar>

    <!-- Main Container with Splitter -->
    <Splitter class="flex-1">
      <SplitterPanel :size="20" class="bg-gray-100">
        <!-- Sidebar -->
        <div class="p-4 h-full overflow-y-auto">
          <h2 class="text-lg font-medium mb-4">Menu Drawer</h2>
          <NavCustomSideBarLateral />
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

<style>
/* Global styles if needed */
</style>
