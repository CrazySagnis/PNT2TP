<template>
  <!-- BANNER -->
  <div class="banner-swiper" v-if="!searchStore.query">
    <swiper slides-per-view="1" navigation autoplay loop>
      <swiper-slide>
        <img
          :src="bannerASUS"
          alt="Banner ASUS"
          @click="buscarMarca('asus')"
          style="cursor: pointer"
        />
      </swiper-slide>
      <swiper-slide>
        <img
          :src="bannerMSI"
          alt="Banner MSI"
          @click="buscarMarca('msi')"
          style="cursor: pointer"
        />
      </swiper-slide>
    </swiper>
  </div>

  <!-- TÍTULO -->
  <div class="container my-5">
    <h2
      class="text-center fw-bold mb-5"
      :class="{
        'mt-with-banner': !searchStore.query,
        'mt-without-banner': searchStore.query,
      }"
    >
      🛒 <span style="font-size: 1.6rem; color: #ffc107">Productos</span>
    </h2>

    <!-- SI HAY PRODUCTOS -->
    <template v-if="Object.keys(productosStore.productosFiltradosPorCategoria).length > 0">
      <template v-for="(grupo, tipo) in productosStore.productosFiltradosPorCategoria" :key="tipo">
        <div class="mb-5" :id="tipo">
          <h3 class="text-center text-primary">{{ tipo }}</h3>

          <div class="position-relative">
            <swiper
              slides-per-view="3"
              space-between="20"
              navigation
              class="product-swiper"
            >
              <swiper-slide
                v-for="item in grupoFiltrado(grupo)"
                :key="item.id"
              >
                <div class="card h-100 shadow-sm rounded-4 position-relative product-card">
                  <img
                    :src="item.imagen"
                    class="card-img-top p-3"
                    alt="imagen"
                    style="max-height: 200px; object-fit: contain"
                  />
                  <div class="card-body d-flex flex-column">
                    <h5 class="card-title fw-semibold mb-2">{{ item.nombre }}</h5>
                    <p class="text-muted small mb-2">{{ item.marca }}</p>
                    <p class="text-success fw-bold mb-2">
                      {{ mostrarPrecioMinimo(item.id) }}
                    </p>
                    <p class="card-text text-muted small flex-grow-1">
                      {{ item.descripcion }}
                    </p>
                    <div class="d-flex flex-column gap-2 mt-3">
                      <router-link
                        :to="{ name: 'Details', params: { id: item.id } }"
                        class="btn btn-primary"
                      >
                        Ver más
                      </router-link>
                      <button class="btn btn-success">Comprar</button>
                      <button
                        class="btn btn-outline-secondary"
                        @click.stop="abrirModalCarrito(item)"
                      >
                        Añadir al carrito
                      </button>
                    </div>
                  </div>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </template>
    </template>

    <!-- NO HAY RESULTADOS -->
    <template v-else>
      <div class="alert alert-warning text-center fw-bold fs-5">
        No se encontraron productos que coincidan con la búsqueda.
      </div>
    </template>

    <!-- MODAL -->
    <div
      class="modal fade"
      tabindex="-1"
      :class="{ show: mostrarModalCarrito }"
      style="display: block;"
      v-if="mostrarModalCarrito"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Elegí tienda para {{ productoSeleccionado?.nombre }}</h5>
            <button type="button" class="btn-close" @click="cerrarModalCarrito"></button>
          </div>
          <div class="modal-body">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Tienda</th>
                  <th>Precio</th>
                  <th>Link</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="r in preciosActuales"
                  :key="r.id"
                >
                  <td>{{ r.tienda }}</td>
                  <td class="fw-bold text-success">$ {{ r.precio.toLocaleString() }}</td>
                  <td>
                    <a :href="r.linkProducto" target="_blank">Ver producto</a>
                  </td>
                  <td>
                    <button class="btn btn-primary btn-sm" @click="agregarDesdeModal(r)">
                      Añadir
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="cerrarModalCarrito">Cerrar</button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal-backdrop fade show"
      v-if="mostrarModalCarrito"
    ></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSearchStore } from '@/stores/searchStore'
import { useAuthStore } from '@/stores/usuarioStore'
import { useProductosStore } from '@/stores/productosStore'
import { useCartStore } from '@/stores/cartStore'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'

import bannerASUS from '@/assets/banner/bannerASUS.png'
import bannerMSI from '@/assets/banner/BannerMSI.png'

const productosStore = useProductosStore()
const router = useRouter()
const cartStore = useCartStore()
const searchStore = useSearchStore()
const authStore = useAuthStore()

const productoEnPruebaId = ref(null)
const productoSeleccionado = ref(null)
const mostrarModalCarrito = ref(false)
const preciosActuales = ref([])

const mostrarBoton = (id) => {
  productoEnPruebaId.value = id
  setTimeout(() => {
    productoEnPruebaId.value = null
  }, 2000)
}

function mostrarPrecioMinimo(productoId) {
  const registrosDelProducto = productosStore.registros.filter(
    (r) => r.productoid === productoId.toString(),
  )

  if (registrosDelProducto.length === 0) return 'MOMENTÁNEAMENTE SIN STOCK'

  const preciosNumericos = registrosDelProducto.map((r) => r.precio)
  const precioMin = Math.min(...preciosNumericos)

  return `$ ${precioMin.toLocaleString()}`
}

function grupoFiltrado(grupo) {
  if (!searchStore.query) return grupo
  const q = searchStore.query.toLowerCase()
  return grupo.filter((item) => item.nombre.toLowerCase().includes(q))
}

function buscarMarca(marca) {
  searchStore.query = marca
}

function abrirModalCarrito(producto) {
  productoSeleccionado.value = producto

  const registrosFiltrados = productosStore.registros.filter(
    (r) => r.productoid === producto.id.toString()
  )
  const ultimosPorTienda = {}
  registrosFiltrados.forEach(r => {
    const actual = ultimosPorTienda[r.tienda]
    if (!actual || new Date(r.fecha) > new Date(actual.fecha)) {
      ultimosPorTienda[r.tienda] = r
    }
  })
  preciosActuales.value = Object.values(ultimosPorTienda)

  mostrarModalCarrito.value = true
}

function agregarDesdeModal(registro) {
  cartStore.agregarAlCarrito({
    id: productoSeleccionado.value.id,
    nombre: productoSeleccionado.value.nombre,
    imagen: productoSeleccionado.value.imagen,
    descripcion: productoSeleccionado.value.descripcion,
    tienda: registro.tienda,
    precio: registro.precio,
    link: registro.linkProducto
  })
  mostrarModalCarrito.value = false
}

function cerrarModalCarrito() {
  mostrarModalCarrito.value = false
}
</script>
