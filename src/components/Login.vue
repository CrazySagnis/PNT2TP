<template>
  <div>
    <h2>Login</h2>
    <input v-model="username" placeholder="Usuario" />
    <input v-model="password" type="password" placeholder="Contraseña" />
    <button @click="goHome">Ir a Home</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const router = useRouter()
const username = ref('')
const password = ref('')
function goHome() {
  router.push('/home')
}
</script>

<!-- <script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    goHome() {
      this.$router.push('/home')
    },
  },
}
</script> -->
