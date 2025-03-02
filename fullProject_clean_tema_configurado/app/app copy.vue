<template>
  <div class="flex flex-col h-screen">
    <Loading/>
    <!-- Adicione isso logo após a Toolbar no seu app.vue -->
       <!-- Global Toast container -->
       <Toast position="top-right" />
       <!--toast foi colocado como global para ser utilizado em qualquer lugar do projeto-->
       <!-- se colocar ele direto em uma page ou componet tava dando Erro! -->
    <!-- Top Navbar with PrimeVue Toolbar -->

    <!-- example to use loading component -->
    <!-- <LoadingExampleToUse/> -->
    
    <!-- navbar -->
    <NavDefault/>
<NuxtLayout/>
 
  </div>
</template>


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