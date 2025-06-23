<template>
  <div class="fondo-formulario d-flex justify-content-center align-items-center min-vh-100">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-10 rounded-4 p-0 shadow-lg overflow-hidden form-container">
          <div class="row g-0">
            <div class="col-md-6 p-5 d-flex flex-column justify-content-center">
              <div class="text-center mb-3">
                <img
                  src="@/assets/img/MeowWare.png"
                  alt="Logo MeowWare"
                  class="img-fluid"
                  style="max-height: 70px"
                />
              </div>

              <h3 class="text-center mb-4 titulo-formulario">Nuevo Producto</h3>

              <div class="mb-3">
                <label class="form-label">Nombre</label>
                <input
                  v-model="nombre"
                  type="text"
                  class="form-control"
                  placeholder="Nombre del producto"
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Descripción</label>
                <textarea
                  v-model="descripcion"
                  class="form-control"
                  rows="3"
                  placeholder="Descripción del producto"
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Precio</label>
                <input
                  v-model="precio"
                  type="number"
                  class="form-control"
                  placeholder="Precio en ARS"
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Categoría</label>
                <input
                  v-model="categoria"
                  type="text"
                  class="form-control"
                  placeholder="Ej: Hardware, Gaming..."
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Imagen del Producto</label>
                <input @change="manejarImagen" type="file" class="form-control" accept="image/*" />
              </div>

              <div v-if="previewImagen" class="text-center mb-3">
                <img :src="previewImagen" class="img-fluid rounded" style="max-height: 200px" />
              </div>

              <div class="mb-3">
                <label class="form-label">Link a la Tienda</label>
                <input
                  v-model="linkTienda"
                  type="text"
                  class="form-control"
                  placeholder="https://..."
                />
              </div>

              <button class="btn btn-ingresar w-100 mt-2" @click="crearProducto">
                Crear Producto
              </button>

              <p
                v-if="mensaje"
                :class="['text-center mt-3', esError ? 'text-danger' : 'text-success']"
              >
                {{ mensaje }}
              </p>
            </div>

            <div
              class="col-md-6 d-flex flex-column justify-content-center align-items-center p-4 text-white text-center anuncio-hardware"
            >
              <h2 class="fw-bold">🛠️ Agregá lo mejor</h2>
              <p class="lead mb-3">Sumá nuevos productos a tu tienda.</p>
              <p style="font-size: 0.85rem">
                Asegurate de completar todos los campos correctamente.
              </p>

              <hr class="w-50 my-4" />

              <p style="font-size: 0.9rem; opacity: 0.8">
                Tu catálogo es tu carta de presentación. <br />
                ¡Mantenelo siempre actualizado con lo último en tecnología!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const nombre = ref('')
const descripcion = ref('')
const precio = ref(null)
const categoria = ref('')
const archivoImagen = ref(null)
const previewImagen = ref(null)
const linkTienda = ref('')
const mensaje = ref('')
const esError = ref(false)

function manejarImagen(evento) {
  const archivo = evento.target.files[0]
  if (archivo) {
    archivoImagen.value = archivo
    previewImagen.value = URL.createObjectURL(archivo)
  }
}

function crearProducto() {
  if (
    nombre.value &&
    descripcion.value &&
    precio.value &&
    categoria.value &&
    archivoImagen.value &&
    linkTienda.value
  ) {
    console.log('Producto creado:', {
      nombre: nombre.value,
      descripcion: descripcion.value,
      precio: precio.value,
      categoria: categoria.value,
      imagen: archivoImagen.value.name,
      linkTienda: linkTienda.value,
    })

    mensaje.value = 'Producto creado correctamente'
    esError.value = false

    nombre.value = ''
    descripcion.value = ''
    precio.value = null
    categoria.value = ''
    archivoImagen.value = null
    previewImagen.value = null
    linkTienda.value = ''
  } else {
    mensaje.value = 'Todos los campos son obligatorios'
    esError.value = true
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;700&display=swap');

.fondo-formulario {
  background-image: url('@/assets/fondo.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.form-container {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(6px);
  font-family: 'Rajdhani', sans-serif;
}

.titulo-formulario {
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
  background-image:
    linear-gradient(to bottom, rgba(31, 31, 43, 0.9), rgba(31, 31, 43, 0.9)),
    url('@/assets/img/fotoPrueba.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: #d1e4ff;
  font-family: 'Rajdhani', sans-serif;
}
</style>
