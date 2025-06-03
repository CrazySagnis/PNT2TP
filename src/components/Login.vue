<template>
  <div class="container mt-5" style="max-width: 400px">
    <h2 class="mb-3">Iniciar Sesión</h2>

    <input v-model="username" placeholder="Usuario" class="form-control mb-2" />
    <input v-model="password" type="password" placeholder="Contraseña" class="form-control mb-3" />

    <div class="d-grid gap-2 mb-3">
      <button @click="logIn" class="btn btn-primary">Iniciar Sesión</button>
    </div>

    <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/usuarioStore'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const errorMessage = ref('')

async function logIn() {
  errorMessage.value = ''
  try {
    const response = await fetch('https://www.mockachino.com/69b724dc-dd10-4e/users')
    const data = await response.json()

    const user = data.users.find(
      (u) =>
        u.username === username.value.trim() &&
        u.password === password.value.trim()
    )

    if (user) {
      authStore.setUsuario(user)
      router.push('/home')
    } else {
      errorMessage.value = 'Usuario o contraseña incorrectos'
    }
  } catch (error) {
    errorMessage.value = 'Error al conectar con el servidor'
    console.error(error)
  }
}
</script>
<style scoped></style>