<template>
  <div class="container my-5">
    <h2 class="text-center fw-bold mb-5">
      🛒 <span style="font-size: 1.6rem">Productos</span>
    </h2>

    <div class="row g-4 justify-content-center">
      <div
        class="col-12 col-sm-6 col-lg-4"
        v-for="item in items"
        :key="item.id + '-' + item.modelo"
      >
        <div
          class="card h-100 shadow-sm border-0 rounded-4 position-relative cursor-pointer product-card"
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
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/usuarioStore'

const router = useRouter()
const authStore = useAuthStore()
const usuario = authStore.usuario
const items = ref([])
const productoEnPruebaId = ref(null)

onMounted(async () => {
  if (!usuario) {
    router.push('/login')
    return
  }

  try {
    const res = await fetch('https://www.mockachino.com/69b724dc-dd10-4e/lugar2')
    const data = await res.json()
    items.value = data.PlacaVideo9070Xt.flatMap(item => [item, item, item])
  } catch (error) {
    console.error('Error al traer los datos:', error)
  }
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
</style>
