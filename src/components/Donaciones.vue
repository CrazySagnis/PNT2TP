<script setup>
import axios from 'axios'

const ACCESS_TOKEN = 'TEST-6936422238391276-062117-488dc9994b44a3e69d9822b5b8dd93fa-234650284'

async function donar(monto) {
  try {
    const response = await axios.post(
      'https://api.mercadopago.com/checkout/preferences',
      {
        items: [
          {
            title: `Donación de $${monto}`,
            unit_price: monto,
            quantity: 1,
          },
        ],
        back_urls: {
          success: 'https://www.tu-sitio.com/success',
          failure: 'https://www.tu-sitio.com/failure',
          pending: 'https://www.tu-sitio.com/pending',
        },
        auto_return: 'approved',
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      },
    )

    const initPoint = response.data.init_point
    window.location.href = initPoint
  } catch (error) {
    console.error('Error al generar preferencia', error)
    alert('Ocurrió un error, intentá más tarde')
  }
}
</script>

<template>
  <div class="container my-5 text-center">
    <h2 class="mb-4">❤️ Apoyá el proyecto</h2>
    <button class="btn btn-primary m-2" @click="donar(200)">Donar $200</button>
    <button class="btn btn-primary m-2" @click="donar(500)">Donar $500</button>
    <button class="btn btn-primary m-2" @click="donar(1000)">Donar $1000</button>
  </div>
</template>
