<template>
  <div class="flex flex-col h-screen">
    <Loading/>
    <!-- Adicione isso logo após a Toolbar no seu app.vue -->
       <!-- Global Toast container -->
       <Toast position="top-right" />
       <!--toast foi colocado como global para ser utilizado em qualquer lugar do projeto-->
       <!-- se colocar ele direto em uma page ou componet tava dando Erro! -->
    <!-- Top Navbar with PrimeVue Toolbar -->
    <Toolbar class="bg-gray-800 shadow-md">
      <template #start>
        <Button label="Primary" class="mx-2" @click="loadingStore.toggleIsLoading" title="change loding" />
        <div class="border-l-2 border-gray-300 h-6 mx-2"> Status: {{ loadingStore.isLoading }} </div>
        <h1 class="text-xl text-center text-blue-300 font-semibold">Nuxt3 and ElectronJS - Simple IPC-Communication Project</h1>
        <br>
        <span class="text-sm text-gray-300 ml-2">Bem vindo, {{name}}</span>
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

<script setup>
//toogle loading Store
const loadingStore = useLoadingStore()


</script>

<style>

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