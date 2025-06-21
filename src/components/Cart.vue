<template>
  <div class="container my-5">
    <h2 class="text-center fw-bold mb-5">🛒 Carrito</h2>

    <div v-if="cartStore.items.length > 0" class="row">
      <div class="col-md-8">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Tienda</th>
              <th>Precio</th>
              <th>Antes</th>
              <th>Link</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in cartStore.items" :key="index">
              <td>
                <img :src="item.imagen" alt="" style="height: 50px; margin-right: 10px" />
                {{ item.nombre }}
              </td>
              <td>{{ item.tienda }}</td>
              <td class="fw-bold text-success">$ {{ item.precio.toLocaleString() }}</td>
              <td>
                <span
                  v-if="preciosMaximos[item.id] && preciosMaximos[item.id] !== item.precio"
                  class="text-danger text-decoration-line-through"
                >
                  $ {{ preciosMaximos[item.id].toLocaleString() }}
                </span>
                <span v-else class="text-muted">-</span>
              </td>
              <td>
                <a :href="item.link" target="_blank">Ver producto</a>
              </td>
              <td>
                <button class="btn btn-danger btn-sm" @click="cartStore.removerDelCarrito(index)">
                  Quitar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="col-md-4">
        <div class="card p-3 shadow-sm">
          <h5 class="fw-bold mb-3">🐾 Resumen del carrito</h5>
          <p>
            <strong>Precio total sin ayuda:</strong> <br />
            <span class="text-danger">$ {{ totalSinAyuda.toLocaleString() }}</span>
          </p>
          <p>
            <strong>Precio total gracias a nosotros:</strong> <br />
            <span class="text-success">$ {{ totalConAyuda.toLocaleString() }}</span>
          </p>
          <p>
            <strong>Total ahorrado:</strong> <br />
            <span class="text-primary">$ {{ totalAhorro.toLocaleString() }}</span>
          </p>
          <p class="mt-3">
            😺
            <em
              >Gracias por ahorrar con nuestro gatito. <br />
              ¿Querés ayudar a más michis?</em
            >
          </p>
          <button class="btn btn-warning w-100 fw-bold" @click="donar()">
            Donar ${{ donacionRecomendada.toLocaleString() }} para gatitos 🐱
          </button>
        </div>
      </div>
    </div>

    <div v-if="cartStore.items.length > 0" class="row mt-4">
      <div class="col-md-8">
        <button class="btn btn-outline-danger" @click="cartStore.vaciarCarrito()">
          Vaciar carrito 🗑️
        </button>
      </div>
    </div>

    <div v-else class="alert alert-info text-center">
      El carrito está vacío. ¡Agregá productos! 🐾
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()

const registros = ref([])

const preciosMaximos = ref({})

onMounted(async () => {
  try {
    const resRegistros = await fetch(
      'https://684b6f8ded2578be881b5940.mockapi.io/comparador/productos/registros',
    )
    registros.value = await resRegistros.json()

    const preciosPorProducto = {}
    registros.value.forEach((r) => {
      const id = r.productoid
      if (!preciosPorProducto[id] || r.precio > preciosPorProducto[id]) {
        preciosPorProducto[id] = r.precio
      }
    })

    preciosMaximos.value = preciosPorProducto
  } catch (error) {
    console.error('Error al traer registros:', error)
  }
})

const totalSinAyuda = computed(() => {
  let total = 0
  cartStore.items.forEach((item) => {
    const precioMax = preciosMaximos.value[item.id]
    total += precioMax ?? item.precio
  })
  return total
})

const totalConAyuda = computed(() => {
  let total = 0
  cartStore.items.forEach((item) => {
    total += item.precio
  })
  return total
})

const totalAhorro = computed(() => {
  return totalSinAyuda.value - totalConAyuda.value
})

const donacionRecomendada = computed(() => {
  return Math.round(totalAhorro.value * 0.01)
})

function donar() {
  window.open('https://link.mercadopago.com.ar/meoware', '_blank')
}
</script>
