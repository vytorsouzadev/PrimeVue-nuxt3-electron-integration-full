<template>
    <div class="card">
        <h1>my card</h1>
        
<Card>
    <template #title>Simple Card</template>
    <template #content>
        <p class="m-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
            quas!
        </p>
    </template>
</Card>
        <hr>

      <p-button label="Click Me" />
      
      <p-data-table :value="products" table-style="min-width: 50rem">
        <p-column field="code" header="Code"></p-column>
        <p-column field="name" header="Name"></p-column>
        <p-column field="price" header="Price"></p-column>
      </p-data-table>

      <hr>
      <div class="card">
        <Paginator :rows="10" :totalRecords="120" :rowsPerPageOptions="[10, 20, 30]"></Paginator>
    </div>
    <hr>
    <div id="image-compare-container">
        <ImageCompare class="shadow-lg rounded-2xl">
    <template #left>
        <img src="https://www.freestock.com/450/freestock_51388774.jpg" />
    </template>
    <template #right>
        <img src="https://www.freestock.com/450/freestock_20253631.jpg" />
    </template>
</ImageCompare>
    </div>
    </div>
  </template>
  
  <script setup>
  const products = [
    { code: '1', name: 'Product 1', price: 20 },
    { code: '2', name: 'Product 2', price: 30 },
    { code: '3', name: 'Product 3', price: 40 }
  ]
  
  </script>
  