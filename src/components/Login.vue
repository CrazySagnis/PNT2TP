<template>
  <div class="fondo-login d-flex justify-content-center align-items-center min-vh-100">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-10 rounded-4 p-0 shadow-lg overflow-hidden login-container">
          <div class="row g-0">
            <!-- COLUMNA IZQUIERDA -->
            <div class="col-md-6 p-5 d-flex flex-column justify-content-between">
              <div>
                <h3 class="text-center mb-4 titulo-login">Iniciar Sesión</h3>

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
                  <div class="input-group">
                    <input
                      :type="mostrarClave ? 'text' : 'password'"
                      v-model="contrasena"
                      class="form-control"
                      placeholder="Ingrese su contraseña"
                    />
                    <button
                      class="btn btn-outline-secondary btn-sm"
                      type="button"
                      @click="mostrarClave = !mostrarClave"
                      style="width: 38px; padding: 2px 6px"
                      title="Mostrar u ocultar contraseña"
                    >
                      👁
                    </button>
                  </div>
                </div>

                <button class="btn btn-ingresar w-100 mt-2" @click="iniciarSesion">Ingresar</button>

                <p v-if="error" class="text-danger text-center mt-3">
                  {{ error }}
                </p>
              </div>

              <div class="text-center mt-4">
                <button
                  class="btn btn-link p-0 text-decoration-none text-dark fw-bold"
                  @click="olvido = !olvido"
                >
                  ¿Me olvidé la contraseña?
                </button>
              </div>

              <div v-if="olvido" class="mt-2">
                <label class="form-label">Ingresá tu mail:</label>
                <input
                  v-model="emailOlvido"
                  type="email"
                  :class="['form-control mb-2', error && !mensajeRecupero ? 'is-invalid' : '']"
                  placeholder="tucorreo@example.com"
                />
                <button class="btn btn-dark w-100" @click="enviarRecuperacion">Enviar</button>

                <div
                  v-if="mensajeRecupero"
                  class="alert alert-success alert-dismissible fade show mt-3"
                  role="alert"
                >
                  Se envió el mail con las opciones para recuperar tu contraseña.
                  <button type="button" class="btn-close" @click="mensajeRecupero = false"></button>
                </div>
              </div>
            </div>

            <!-- COLUMNA DERECHA -->
            <div
              class="col-md-6 d-flex flex-column justify-content-center align-items-center p-4 text-white text-center anuncio-hardware"
            >
              <h2 class="fw-bold">⚡ Rendimiento al Máximo</h2>
              <p class="lead mb-3">
                Tu próximo setup empieza acá: motherboards, placas de video y más.
              </p>
              <p style="font-size: 0.85rem">
                Accedé a ofertas exclusivas para miembros registrados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/usuarioStore'

export default {
  setup() {
    const router = useRouter()
    const store = useAuthStore()

    const usuario = ref('')
    const contrasena = ref('')
    const mostrarClave = ref(false)
    const error = ref('')
    const olvido = ref(false)
    const emailOlvido = ref('')
    const mensajeRecupero = ref(false)

    const iniciarSesion = () => {
      const usuariosValidos = [
        { usuario: 'admin', contrasena: 'admin', rol: 'admin' },
        { usuario: 'usuario', contrasena: 'usuario', rol: 'limitado' },
        { usuario: 'prueba', contrasena: 'prueba', rol: 'prueba' },
      ]

      const encontrado = usuariosValidos.find(
        (u) => u.usuario === usuario.value && u.contrasena === contrasena.value,
      )

      if (encontrado) {
        store.setUsuario(encontrado)
        router.push('/home')
      } else {
        error.value = 'Usuario o contraseña incorrectos'
      }
    }

    const enviarRecuperacion = () => {
      const email = emailOlvido.value.trim()
      const esEmailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

      if (esEmailValido) {
        mensajeRecupero.value = true
        error.value = ''
      } else {
        mensajeRecupero.value = false
        error.value = 'Ingresá un correo válido'
      }
    }

    return {
      usuario,
      contrasena,
      mostrarClave,
      error,
      olvido,
      emailOlvido,
      mensajeRecupero,
      iniciarSesion,
      enviarRecuperacion,
    }
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;700&display=swap');

.fondo-login {
  background-image: url('@/assets/fondo.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.login-container {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(6px);
  font-family: 'Rajdhani', sans-serif;
}

.titulo-login {
  font-weight: 700;
  font-size: 1.8rem;
}

.btn-ingresar {
  background-color: #1f1f2b;
  color: white;
  font-weight: 700;
  border: none;
  transition: all 0.2s ease-in-out;
}

.btn-ingresar:hover {
  background-color: #2d2d3b;
  transform: scale(1.03);
}

.anuncio-hardware {
  background: #1f1f2b;
  color: #d1e4ff;
  font-family: 'Rajdhani', sans-serif;
}

.is-invalid {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.1rem rgba(220, 53, 69, 0.25);
}
</style>
