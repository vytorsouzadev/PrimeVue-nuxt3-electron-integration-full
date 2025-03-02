<template>
    
    <div>
        <h1>Wecome to Home Page</h1>
        <hr>
        <div class="w-full p-2 m-2">
        <p-button label="Click Me">
            <nuxt-link to="/primevue">Primevue</nuxt-link>
            <nuxt-link to="/chart/1">chart</nuxt-link>
            <nuxt-link to="/toast">toast</nuxt-link>
            <nuxt-link to="/tasks">Tasks</nuxt-link>
            <nuxt-link to="/">Home</nuxt-link>
            <nuxt-link to="/tailwind">Tailwind</nuxt-link>
        </p-button>
      
      </div>
    </div>
</template>

<style scoped>
h1{
    text-align: center;
    color: #fff;
    background: #1e293b;
    border: 1px solid #1e293b;
    max-width: 400px;
    margin: 15px auto;
    border-radius: 5px;
    padding: 15px;
}
</style>
