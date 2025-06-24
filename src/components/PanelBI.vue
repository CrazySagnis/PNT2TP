<template>
  <div class="container my-5 text-white">
    <h2 class="text-center fw-bold mb-5 text-warning">📊 Panel de Análisis BI</h2>

    <div class="mb-4 d-flex flex-wrap gap-2 justify-content-center">
      <button
        v-for="cat in categorias"
        :key="cat"
        class="btn"
        :class="cat === categoriaSeleccionada ? 'btn-warning' : 'btn-outline-light'"
        @click="categoriaSeleccionada = cat"
      >
        {{ cat }}
      </button>
    </div>

    <h4 class="fw-bold text-center mb-3">🔍 Top productos en {{ categoriaSeleccionada }}</h4>
    <apex-chart
      type="bar"
      height="300"
      :options="chartOptions"
      :series="chartSeries"
    ></apex-chart>

    <h4 class="fw-bold text-center my-4">🏪 Empresas en tendencia</h4>
    <apex-chart
      type="donut"
      height="300"
      :options="empresasChartOptions"
      :series="empresasSeries"
    ></apex-chart>

    <h4 class="fw-bold mt-5 mb-3">🏅 Top productos generales</h4>
    <ol class="list-group list-group-numbered">
      <li
        v-for="(item, index) in topProductosGenerales"
        :key="index"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        {{ item.nombre }}
        <span class="badge bg-primary rounded-pill">{{ item.conteo }}</span>
      </li>
    </ol>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const registros = ref([])

onMounted(() => {
  registros.value = [
    { categoria: 'Placas de Video', nombre: 'RTX 4070', tienda: 'CompraGamer', fecha: '2024-06-10' },
    { categoria: 'Placas de Video', nombre: 'RTX 4070', tienda: 'CompraGamer', fecha: '2024-06-11' },
    { categoria: 'Procesadores', nombre: 'Ryzen 7 5800X', tienda: 'FullH4rd', fecha: '2024-06-12' },
    { categoria: 'Teclados', nombre: 'HyperX Alloy', tienda: 'Venex', fecha: '2024-06-12' },
    { categoria: 'Teclados', nombre: 'HyperX Alloy', tienda: 'Venex', fecha: '2024-06-12' },
    { categoria: 'Placas de Video', nombre: 'RTX 4080', tienda: 'CompraGamer', fecha: '2024-06-12' },
    { categoria: 'Procesadores', nombre: 'Intel i7 12700K', tienda: 'FullH4rd', fecha: '2024-06-12' },
    { categoria: 'Teclados', nombre: 'Logitech G Pro', tienda: 'CompraGamer', fecha: '2024-06-13' },
    { categoria: 'Procesadores', nombre: 'Intel i7 12700K', tienda: 'CompraGamer', fecha: '2024-06-13' },
    { categoria: 'Placas de Video', nombre: 'RTX 4070', tienda: 'Venex', fecha: '2024-06-14' },
  ]
  actualizarEmpresasChart()
})

const categorias = computed(() => {
  const cats = new Set(registros.value.map(r => r.categoria))
  return Array.from(cats)
})

const categoriaSeleccionada = ref('Placas de Video')

const chartSeries = computed(() => {
  const conteo = {}
  registros.value
    .filter(r => r.categoria === categoriaSeleccionada.value)
    .forEach(r => {
      conteo[r.nombre] = (conteo[r.nombre] || 0) + 1
    })
  return [{
    name: 'Vistas',
    data: Object.entries(conteo).map(([nombre, count]) => ({ x: nombre, y: count }))
  }]
})

const chartOptions = {
  chart: { toolbar: { show: false } },
  xaxis: { labels: { style: { colors: '#fff' } } },
  yaxis: { labels: { style: { colors: '#fff' } } },
  colors: ['#ffc107'],
  theme: { mode: 'dark' }
}

const empresasSeries = ref([])
const empresasChartOptions = ref({
  labels: [],
  chart: {
    type: 'donut',
  },
  colors: ['#007bff', '#28a745', '#ffc107', '#dc3545', '#6610f2', '#17a2b8'],
  legend: {
    labels: {
      colors: '#fff',
    }
  },
  theme: { mode: 'dark' }
})

function actualizarEmpresasChart() {
  const conteo = {}
  registros.value.forEach((r) => {
    conteo[r.tienda] = (conteo[r.tienda] || 0) + 1
  })

  empresasSeries.value = Object.values(conteo)
  empresasChartOptions.value.labels = Object.keys(conteo)
}

const topProductosGenerales = computed(() => {
  const conteo = {}
  registros.value.forEach(r => {
    conteo[r.nombre] = (conteo[r.nombre] || 0) + 1
  })

  return Object.entries(conteo)
    .map(([nombre, conteo]) => ({ nombre, conteo }))
    .sort((a, b) => b.conteo - a.conteo)
    .slice(0, 5)
})
</script>

<style scoped>
.container {
  max-width: 1000px;
}

.list-group-item {
  font-size: 1.1rem;
  background-color: #212529;
  color: #fff;
}
</style>
