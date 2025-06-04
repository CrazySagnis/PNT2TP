<template>
  <div class="container my-5">
    <h2 class="text-center fw-bold mb-5">
      🛒 <span style="font-size: 1.6rem">Productos</span>
    </h2>

    <div v-for="(grupo, modelo) in items" :key="modelo" class="mb-5">
      <h3 class="text-center">{{ modelo }}</h3>

      <div class="row g-4 justify-content-center">
        <div
          class="col-12 col-sm-6 col-lg-4"
          v-for="item in grupo"
          :key="item.id"
        >
          <div
            class="card h-100 shadow-sm rounded-4 position-relative cursor-pointer product-card"

            @click="mostrarBoton(item.id)"
          >
            <img
              :src="item.imagen"
              class="card-img-top p-3"
              alt="imagen"
              style="max-height: 200px; object-fit: contain"
            />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title fw-semibold mb-2">{{ item.modelo }}</h5>
              <p class="text-success fw-bold mb-2">{{ `$ ${item.precio_ars}` }}</p>
              <p class="card-text text-muted small flex-grow-1">
                {{ item.descripcion }}
              </p>
             <router-link :to="{ name: 'Details', params: { id: item.id } }" class="btn btn-primary mt-3">
                Ver más
              </router-link>

            </div>

            <transition name="fade">
              <div
                v-if="productoEnPruebaId === item.id"
                class="btn btn-warning position-absolute top-50 start-50 translate-middle fw-bold shadow"
                style="z-index: 10"
              >
                PROBANDO
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/usuarioStore'

const router = useRouter()
const authStore = useAuthStore()
const usuario = authStore.usuario
const items = ref({})
const productoEnPruebaId = ref(null)

onMounted(async () => {
  if (!usuario) {
    router.push('/login')
    return
  }

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

function mostrarBoton(id) {
  productoEnPruebaId.value = id
  setTimeout(() => {
    productoEnPruebaId.value = null
  }, 2000)
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.product-card {
  transition: border 0.3s ease;
}

.product-card:hover {
  border: 2px solid #dc3545; /* rojo Bootstrap */
}
</style>
