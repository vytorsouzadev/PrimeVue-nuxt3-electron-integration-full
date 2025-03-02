<template>
    <div class="card">
<!--         
        nota: tive que colocar o comopoent Toast no app.vue para funcionar
        porque se eu colocar direto aqui da erro! -->

      <div class="flex flex-wrap gap-2">
        <Button label="Show Toast" @click="showToast" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { useToast } from 'primevue/usetoast';
  
  const toast = useToast();
  
  const showToast = () => {
    toast.add({
      severity: 'secondary',
      summary: 'Info Message',
      detail: 'Message Content',
      life: 3000
    });
  };
  </script>
  