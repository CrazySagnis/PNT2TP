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

      <button class="btn btn-secondary mt-4" @click="router.back()">Volver</button>
    </div>
  </div>

  <div v-else class="text-center my-5">
    <div class="spinner-border text-primary" role="status"></div>
    <p class="mt-3">Cargando producto...</p>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const route = useRoute()
const router = useRouter()
const producto = ref(null)

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
        return
      }
    } catch (error) {
      console.error(`Error buscando en ${url}`, error)
    }
  }

  // Si no encontró nada
  router.push('/home')
})
</script>
