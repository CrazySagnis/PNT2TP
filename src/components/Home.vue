<template>
  <div class="banner-swiper" v-if="!searchStore.query">
    <swiper :modules="[Navigation, Autoplay]" :slides-per-view="1" navigation autoplay loop>
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

  <div class="container my-5">
    <h2
      class="text-center fw-bold mb-5"
      :class="{
        'mt-with-banner': !searchStore.query,
        'mt-without-banner': searchStore.query,
      }"
    >
      🛒 <span style="font-size: 1.6rem">Productos</span>
    </h2>

    <!-- Si hay productos -->
    <template v-if="Object.keys(productosStore.productosFiltradosPorCategoria).length > 0">
      <template v-for="(grupo, tipo) in productosStore.productosFiltradosPorCategoria" :key="tipo">
        <div class="mb-5" :id="tipo">
          <h3 class="text-center text-primary">{{ tipo }}</h3>

          <div class="position-relative">
            <swiper
              :modules="[Navigation]"
              :slides-per-view="3"
              :space-between="20"
              navigation
              class="product-swiper"
            >
              <swiper-slide v-for="item in grupo" :key="item.id">
                <div
                  class="card h-100 shadow-sm rounded-4 position-relative cursor-pointer product-card"
                  @click="mostrarBoton(item.id)"
                >
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
                      <button class="btn btn-outline-secondary">Añadir al carrito</button>
                    </div>
                  </div>
                  <transition name="fade">
                    <div
                      v-if="productoEnPruebaId === item.id"
                      class="btn btn-warning position-absolute top-50 start-50 translate-middle fw-bold shadow"
                      style="z-index: 10"
                    >
                      PROBANDO
                    </div>
                  </transition>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </template>
    </template>

    <!-- Si no hay resultados -->
    <template v-else>
      <div class="alert alert-warning text-center fw-bold fs-5">
        No se encontraron productos que coincidan con la búsqueda.
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/usuarioStore'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Autoplay } from 'swiper/modules'
import { useProductosStore } from '@/stores/productosStore'
import { useSearchStore } from '@/stores/searchStore' // 🚀 IMPORTANTE

import bannerASUS from '@/assets/banner/bannerASUS.png'
import bannerMSI from '@/assets/banner/BannerMSI.png'

import 'swiper/css'
import 'swiper/css/navigation'

const productosStore = useProductosStore()
const authStore = useAuthStore()
const searchStore = useSearchStore() // 🚀 HAY QUE DEFINIRLO

const productoEnPruebaId = ref(null)

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

// 🚀 FUNCIÓN para setear la búsqueda desde el banner
function buscarMarca(marca) {
  searchStore.query = marca
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
.product-card {
  transition: border 0.3s ease;
}
.product-card:hover {
  border: 2px solid #dc3545;
}

.swiper-container-wrapper {
  position: relative;
  padding: 0 2rem;
}

.mySwiper {
  overflow: visible;
  padding: 0 2rem;
}

.swiper-button-next,
.swiper-button-prev {
  color: #007bff;
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.swiper-button-prev {
  left: -20px;
}

.swiper-button-next {
  right: -20px;
}

@media (max-width: 768px) {
  .swiper-button-next,
  .swiper-button-prev {
    display: none;
  }
}

.banner-swiper {
  margin-top: 100px; /* para que no tape el navbar */
  margin-bottom: 40px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
}

.banner-swiper img {
  width: 100%;
  height: 500px;
}

.mt-with-banner {
  margin-top: 40px;
}

.mt-without-banner {
  margin-top: 100px;
}
</style>
