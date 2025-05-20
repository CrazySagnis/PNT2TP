<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 mb-4" v-for="item in items" :key="item.id">
        <div class="card h-100">
          <img :src="item.imagen" class="card-img-top" alt="imagen" />
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
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const items = ref([])

onMounted(async () => {
  const usuario = JSON.parse(localStorage.getItem('usuarioActivo'))
  if (!usuario) {
    router.push('/login')
    return
  }

  // Cargar datos si hay sesión válida
  try {
    const res = await fetch('https://www.mockachino.com/69b724dc-dd10-4e/lugar2')
    const data = await res.json()
    items.value = data.PlacaVideo9070Xt
  } catch (error) {
    console.error('Error al traer los datos:', error)
  }
})
</script>
