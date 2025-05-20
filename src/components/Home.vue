<template>
  <div class="container mt-5">
    <div v-for="(grupo, modelo) in items" :key="modelo" class="mb-5">
      <h3 class="mb-4">{{ modelo }}</h3>
      <div class="row">
        <div class="col-md-4 mb-4" v-for="item in grupo" :key="item.id">
          <div class="card h-100">
            <img
              :src="item.imagen.trim()"
              @error="(e) => (e.target.src = 'https://via.placeholder.com/300x200?text=Sin+imagen')"
              class="card-img-top img-fluid"
              alt="imagen"
              style="height: 200px; object-fit: contain"
            />
            <div class="card-body">
              <h5 class="card-title">{{ item.modelo }}</h5>
              <h5 class="card-title">{{ `$ ${item.precio_ars}` }}</h5>
              <p class="card-text">{{ item.descripcion }}</p>
              <a href="#" class="btn btn-primary">Ver más</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const items = ref({}) // Objeto que contendrá los productos agrupados por modelo

onMounted(async () => {
  const usuario = JSON.parse(localStorage.getItem('usuarioActivo'))
  if (!usuario) {
    router.push('/login')
    return
  }

  // URLs de las APIs
  const urls = [
    'https://www.mockachino.com/69b724dc-dd10-4e/lugar1',
    'https://www.mockachino.com/69b724dc-dd10-4e/lugar2',
    'https://www.mockachino.com/69b724dc-dd10-4e/lugar3',
  ]

  const allItems = []

  for (const url of urls) {
    try {
      const response = await fetch(url)
      const data = await response.json()
      allItems.push(...data.PlacaVideo9070Xt)
    } catch (error) {
      console.error(`Error al traer los datos desde ${url}:`, error)
    }
  }

  const grouped = {}
  allItems.forEach((item) => {
    const key = item.modelo.trim()
    if (!grouped[key]) {
      grouped[key] = []
    }
    grouped[key].push(item)
  })

  items.value = grouped
})
</script>
