<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div class="card shadow p-4" style="min-width: 350px; max-width: 400px;">
      <h3 class="text-center mb-4">Iniciar Sesión</h3>

      <div class="mb-3">
        <label class="form-label">Usuario</label>
        <input
          v-model="usuario"
          type="text"
          class="form-control"
          placeholder="Ingrese su usuario"
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Contraseña</label>
        <input
          v-model="contrasena"
          type="password"
          class="form-control"
          placeholder="Ingrese su contraseña"
        />
      </div>

      <button class="btn btn-primary w-100" @click="iniciarSesion">Ingresar</button>

      <p v-if="error" class="text-danger text-center mt-3">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/usuarioStore'

export default {
  data: function () {
    return {
      usuario: '',
      contrasena: '',
      error: ''
    }
  },
  methods: {
    iniciarSesion: function () {
      var store = useAuthStore()

      var usuariosValidos = [
        { usuario: 'admin', contrasena: 'admin', rol: 'admin' },
        { usuario: 'admin2', contrasena: 'admin2', rol: 'limitado' }
      ]

      var encontrado = usuariosValidos.find(function (u) {
        return u.usuario === this.usuario && u.contrasena === this.contrasena
      }.bind(this))

      if (encontrado) {
        store.setUsuario(encontrado)
        this.$router.push('/home')
      } else {
        this.error = 'Usuario o contraseña incorrectos'
      }
    }
  }
}
</script>
