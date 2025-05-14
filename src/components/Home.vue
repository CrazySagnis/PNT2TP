<template>
  <div>
    <h2>Hola, soy el home</h2>
    <button @click="irAlLogin">Ir al Login</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function irAlLogin() {
  router.push('/login')
}
</script>
