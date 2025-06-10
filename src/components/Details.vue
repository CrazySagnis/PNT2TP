<template>
  <div v-if="producto" class="container my-5">
    <div class="card p-4 shadow">
      <img
        :src="producto.imagen"
        class="img-fluid mb-3"
        alt="imagen"
        style="max-height: 300px; object-fit: contain"
      />
      <h2 class="fw-bold">{{ producto.modelo }}</h2>
      <p class="text-success fw-semibold fs-4">$ {{ producto.precio_ars }}</p>
      <p class="text-muted">{{ producto.descripcion }}</p>

      <ul class="list-group list-group-flush mt-3">
        <li class="list-group-item"><strong>Marca:</strong> {{ producto.marca }}</li>
        <li class="list-group-item"><strong>Memoria:</strong> {{ producto.memoria }}</li>
        <li class="list-group-item"><strong>Frecuencia:</strong> {{ producto.frecuencia }}</li>
        <li class="list-group-item"><strong>Stock:</strong> {{ producto.stock }}</li>
        <li class="list-group-item"><strong>Cuotas:</strong> {{ producto.cuotas }}</li>
        <li class="list-group-item"><strong>Envío:</strong> {{ producto.envio }}</li>
        <li class="list-group-item">
          <strong>RGB:</strong>
          <span :class="producto.rgb ? 'text-success' : 'text-danger'">
            {{ producto.rgb ? 'Sí' : 'No' }}
          </span>
        </li>
      </ul>

      <!-- GRÁFICO -->
      <div class="mt-5" v-if="chartSeries[0].data.length > 0">
        <h4 class="fw-bold mb-3 text-center">Historial de Precios</h4>
        <apex-chart type="line" height="350" :options="chartOptions" :series="chartSeries" />
      </div>

      <button class="btn btn-secondary mt-4" @click="router.back()">Volver</button>
    </div>
  </div>

  <div v-else class="text-center my-5">
    <div class="spinner-border text-primary" role="status"></div>
    <p class="mt-3">Cargando producto...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ApexChart from 'vue3-apexcharts'

const producto = ref(null)
const chartSeries = ref([{ name: 'Precio ARS', data: [] }])
const chartOptions = ref({
  chart: {
    id: 'historial-precios',
  },
  xaxis: {
    categories: [],
    title: { text: 'Fecha' },
  },
  yaxis: {
    title: { text: 'Precio ARS' },
  },
  stroke: {
    curve: 'smooth',
  },
  colors: ['#007bff'],
})

const route = useRoute()
const router = useRouter()

onMounted(async () => {
  const id = route.params.id
  if (!id) {
    router.push('/home')
    return
  }

  const urls = [
    'https://www.mockachino.com/69b724dc-dd10-4e/lugar1',
    'https://www.mockachino.com/69b724dc-dd10-4e/lugar2',
    'https://www.mockachino.com/69b724dc-dd10-4e/lugar3',
  ]

  for (const url of urls) {
    try {
      const res = await fetch(url)
      const data = await res.json()
      const match = data.PlacaVideo9070Xt.find((p) => p.id === id)
      if (match) {
        producto.value = match
        //busca historial de precios y lo guarda
        if (match.historial_precios && Array.isArray(match.historial_precios)) {
          chartOptions.value.xaxis.categories = match.historial_precios.map((p) => p.fecha)
          //carga los valores de los precios en las fechas
          chartSeries.value = [
            {
              name: 'Precio ARS',
              data: match.historial_precios.map((p) => p.precio),
            },
          ]
        }

        return
      }
    } catch (err) {
      console.error(`Error buscando en ${url}`, err)
    }
  }

  router.push('/home')
})
</script>
