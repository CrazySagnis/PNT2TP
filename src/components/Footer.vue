<template>
  <footer class="footer bg-dark text-light py-4 mt-5">
    <div class="container-fluid px-5">
      <div class="row">
        <div class="col-md-4 mb-3">
          <router-link
            class="navbar-brand fw-bold text-warning d-flex align-items-center"
            to="/home"
          >
            <img :src="MeowWare32" alt="MeowWare Logo" class="navbar-logo me-2" />
          </router-link>
          <p>Tu tienda confiable de componentes de hardware. Calidad y rendimiento garantizados.</p>
        </div>
        <div class="col-md-4 mb-3">
          <h5>Enlaces útiles</h5>
          <ul class="list-unstyled">
            <li><a href="/home" class="text-decoration-none text-light">Inicio</a></li>
            <li><a href="/home" class="text-decoration-none text-light">Productos</a></li>
            <li><a href="/home" class="text-decoration-none text-light">Contacto</a></li>
            <li><a href="/home" class="text-decoration-none text-light">Soporte</a></li>
          </ul>
        </div>
        <div class="col-md-4 mb-3">
          <h5>Confianza y Potencia</h5>
          <p>
            Distribuimos productos originales de las marcas más reconocidas del mundo del hardware.
            Elegí rendimiento, elegí calidad.
          </p>

          <div class="d-flex flex-wrap gap-3 align-items-center my-2">
            <img :src="IntelLogo" alt="Intel" style="height: 30px" />
            <img :src="AMDLogo" alt="AMD" style="height: 30px" />
            <img :src="NvidiaLogo" alt="NVIDIA" style="height: 30px" />
            <img :src="MSILogo" alt="MSI" style="height: 30px" />
            <img :src="AsusLogo" alt="ASUS" style="height: 30px" />
            <img :src="GigabyteLogo" alt="GIGABYTE" style="height: 30px" />
          </div>

          <form @submit.prevent class="mt-3">
            <label for="newsletter" class="form-label">Suscribite a nuestras ofertas</label>
            <div class="input-group">
              <input type="email" class="form-control" id="newsletter" placeholder="Tu email" />
              <button class="btn btn-warning" type="submit">Enviar</button>
            </div>
          </form>
        </div>
      </div>
      <div class="text-center mt-3">
        <small>&copy; 2025 TechStore. Todos los derechos reservados.</small>
      </div>
    </div>
  </footer>
</template>

<script setup>
import IntelLogo from '@/assets/img/intel.png'
import AMDLogo from '@/assets/img/amd.png'
import NvidiaLogo from '@/assets/img/nvidia.png'
import MSILogo from '@/assets/img/MSI.png'
import AsusLogo from '@/assets/img/asus.png'
import GigabyteLogo from '@/assets/img/gigabyte.png'
import MeowWare32 from '@/assets/img/MeowWare32.png'
</script>

<style>
.navbar-logo {
  height: 60px;
  width: auto;
  object-fit: contain;
}
</style>
