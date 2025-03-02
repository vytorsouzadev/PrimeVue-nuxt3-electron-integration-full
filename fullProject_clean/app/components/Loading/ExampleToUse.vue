<template>
    <nav>
        <Toolbar class="bg-gray-800 shadow-md">
      <template #start>
        <Button label="Primary" class="mx-2" @click="loadingStore.toggleIsLoading" title="change loding" />
        <div class="border-l-2 border-gray-300 h-6 mx-2"> Status: {{ loadingStore.isLoading }} </div>
        <h1 class="text-xl text-center text-blue-300 font-semibold">Nuxt3 and ElectronJS - Simple IPC-Communication Project</h1>
        <br>
        <span class="text-sm text-gray-300 ml-2">Bem vindo</span>
      </template>
    </Toolbar>
    </nav>
</template>

<script setup>
//toogle loading Store
const loadingStore = useLoadingStore()

</script>