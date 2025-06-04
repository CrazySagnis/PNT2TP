<template>
  <div class="container my-5">
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
      <button class="btn btn-secondary mt-3" @click="volver">Volver</button>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const route = useRoute()
const router = useRouter()

const producto = ref({})

onMounted(() => {
  const data = route.query

  if (!data.id) {
    router.push('/')
    return
  }

  producto.value = {
    id: data.id,
    imagen: data.imagen,
    modelo: data.modelo,
    precio_ars: data.precio_ars,
    descripcion: data.descripcion
  }
})

function volver() {
  router.back()
}
</script>
