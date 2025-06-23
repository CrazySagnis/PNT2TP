<template>
  <div v-if="producto" class="container my-5">
    <div class="card p-4 shadow">
      <img
        :src="producto.imagen"
        class="img-fluid mb-3"
        alt="imagen"
        style="max-height: 300px; object-fit: contain"
      />
      <h2 class="fw-bold">{{ producto.nombre }}</h2>
      <p class="text-muted">{{ producto.descripcion }}</p>

      <div class="mt-5">
        <h4 class="fw-bold mb-3 text-center">Precios actuales por tienda</h4>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Tienda</th>
              <th>Precio</th>
              <th>Ir al sitio</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in registrosProducto" :key="r.id">
              <td>{{ r.tienda }}</td>
              <td class="fw-bold text-success">$ {{ r.precio.toLocaleString() }}</td>
              <td class="d-flex gap-2">
                <a :href="r.link_producto" target="_blank" class="btn btn-outline-primary btn-sm">
                  Ver producto
                </a>
                <button class="btn btn-success btn-sm" @click="agregarAlCarritoDesdeDetails(r)">
                  Añadir al carrito
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

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
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()

const producto = ref(null)
const registrosProducto = ref([])
const chartSeries = ref([])
const chartOptions = ref({
  chart: { id: 'historial-precios' },
  xaxis: {
    categories: [],
    title: { text: 'Fecha' },
  },
  yaxis: { title: { text: 'Precio ARS' } },
  stroke: { curve: 'smooth' },
  colors: ['#007bff', '#28a745', '#dc3545', '#ffc107'],
})

const route = useRoute()
const router = useRouter()

onMounted(async () => {
  const id = route.params.id
  if (!id) {
    router.push('/home')
    return
  }

  try {
    const resProducto = await fetch(
      `https://684b6f8ded2578be881b5940.mockapi.io/comparador/productos/productos/${id}`,
    )
    producto.value = await resProducto.json()

    const resRegistros = await fetch(
      `https://684b6f8ded2578be881b5940.mockapi.io/comparador/productos/registros`,
    )
    const todosRegistros = await resRegistros.json()

    const registrosFiltrados = todosRegistros.filter((r) => r.productoid === id.toString())

    const ultimosPorTienda = {}
    registrosFiltrados.forEach((r) => {
      const actual = ultimosPorTienda[r.tienda]
      if (!actual || new Date(r.fecha) > new Date(actual.fecha)) {
        ultimosPorTienda[r.tienda] = r
      }
    })
    registrosProducto.value = Object.values(ultimosPorTienda)

    const seriesPorTienda = {}
    const categoriasSet = new Set()

    registrosFiltrados.forEach((r) => {
      if (!seriesPorTienda[r.tienda]) {
        seriesPorTienda[r.tienda] = []
      }
      seriesPorTienda[r.tienda].push({ fecha: r.fecha, precio: r.precio })
      categoriasSet.add(r.fecha)
    })

    const fechasOrdenadas = Array.from(categoriasSet).sort((a, b) => new Date(a) - new Date(b))

    chartSeries.value = Object.entries(seriesPorTienda).map(([tienda, valores]) => {
      const mapaPorFecha = {}
      valores.forEach((v) => {
        mapaPorFecha[v.fecha] = v.precio
      })
      const data = fechasOrdenadas.map((f) => mapaPorFecha[f] ?? null)
      return { name: tienda, data }
    })

    chartOptions.value.xaxis.categories = fechasOrdenadas
  } catch (err) {
    console.error('Error al cargar el producto o registros', err)
    router.push('/home')
  }
})

function agregarAlCarritoDesdeDetails(registro) {
  cartStore.agregarAlCarrito({
    id: producto.value.id,
    nombre: producto.value.nombre,
    imagen: producto.value.imagen,
    descripcion: producto.value.descripcion,
    tienda: registro.tienda,
    precio: registro.precio,
    link: registro.link_producto,
  })

  window.alert('✅ Producto añadido al carrito')
}
</script>
