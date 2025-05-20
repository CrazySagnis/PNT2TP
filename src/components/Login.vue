<template>
  <div>
    <h2>Login</h2>
    <input v-model="username" placeholder="Usuario" />
    <input v-model="password" type="password" placeholder="Contraseña" />
    <button @click="goHome">Ir a Home</button>
    <button @click="logIn">Iniciar Sesión</button>
    <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const username = ref('')
const password = ref('')
const errorMessage = ref('')
const users = ref([])

function goHome() {
  router.push('/home')
}

async function logIn() {
  errorMessage.value = ''
  try {
    const response = await fetch('https://www.mockachino.com/69b724dc-dd10-4e/users')
    const data = await response.json()
    users.value = data.users

    const user = users.value.find(
      (u) => u.username === username.value && u.password === password.value,
    )

    if (user) {
      router.push('/home')
      localStorage.setItem('usuarioActivo', JSON.stringify(user))
    } else {
      errorMessage.value = 'Usuario o contraseña incorrectos'
    }
  } catch (error) {
    errorMessage.value = 'Error al conectar con el servidor'
    console.error(error)
  }
}
</script>
