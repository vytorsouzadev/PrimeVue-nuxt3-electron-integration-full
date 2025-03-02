<template>
    <div>
      <h2 class="text-2xl font-bold mb-4">Chart Example</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="card p-4 shadow-md">
          <h3 class="text-xl mb-3">Bar Chart</h3>
          <Chart type="bar" :data="barChartData" :options="chartOptions" />
        </div>
        
        <div class="card p-4 shadow-md">
          <h3 class="text-xl mb-3">Pie Chart</h3>
          <Chart type="pie" :data="pieChartData" :options="pieChartOptions" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  
  const barChartData = ref();
  const pieChartData = ref();
  const chartOptions = ref();
  const pieChartOptions = ref();
  
  onMounted(() => {
    barChartData.value = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          label: 'Sales 2023',
          data: [540, 325, 702, 620, 880, 570],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgb(75, 192, 192)',
          borderWidth: 1
        },
        {
          label: 'Sales 2024',
          data: [650, 440, 770, 590, 730, 690],
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgb(153, 102, 255)',
          borderWidth: 1
        }
      ]
    };
    
    pieChartData.value = {
      labels: ['Desktop', 'Mobile', 'Tablet', 'Other'],
      datasets: [
        {
          data: [540, 325, 702, 150],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)'
          ],
          borderWidth: 1
        }
      ]
    };
  
    chartOptions.value = {
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: 'Monthly Sales Data'
        }
      },
      responsive: true,
      maintainAspectRatio: false
    };
    
    pieChartOptions.value = {
      plugins: {
        legend: {
          position: 'right'
        },
        title: {
          display: true,
          text: 'Device Distribution'
        }
      },
      responsive: true,
      maintainAspectRatio: false
    };
  });
  </script>
  
  <style scoped>
  .card {
    background: white;
    border-radius: 0.5rem;
  }
  </style>
  