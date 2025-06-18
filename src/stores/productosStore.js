import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useSearchStore } from './searchStore'

export const useProductosStore = defineStore('productos', () => {
  const productosPorTipo = ref({})
  const registros = ref([])

  const searchStore = useSearchStore()

  const categoriaSeleccionada = ref('') // 🚀 cuál categoría está activa

  const grupoFiltrado = (grupo) => {
    const q = (searchStore.query || '').toLowerCase()
    if (!q) return grupo
    return grupo.filter((item) => item.nombre.toLowerCase().includes(q))
  }

  const productosCargados = computed(() => {
    return Object.keys(productosPorTipo.value).length > 0
  })

  // 🚀 Todas las categorías posibles (sin filtro)
  const categoriasDisponibles = computed(() => {
    return Object.keys(productosPorTipo.value)
  })

  // 🚀 Categorías visibles (según búsqueda actual)
  const categoriasVisibles = computed(() => {
    const resultado = []
    for (const [tipo, grupo] of Object.entries(productosPorTipo.value)) {
      const filtrado = grupoFiltrado(grupo)
      if (filtrado.length > 0) {
        resultado.push(tipo)
      }
    }
    return resultado
  })

  // 🚀 Productos a mostrar en Home
  const productosFiltradosPorCategoria = computed(() => {
    const resultado = {}
    for (const [tipo, grupo] of Object.entries(productosPorTipo.value)) {
      if (!categoriaSeleccionada.value || categoriaSeleccionada.value === tipo) {
        const filtrado = grupoFiltrado(grupo)
        if (filtrado.length > 0) {
          resultado[tipo] = filtrado
        }
      }
    }
    return resultado
  })

  async function cargarProductos() {
    try {
      const resProductos = await fetch(
        'https://684b6f8ded2578be881b5940.mockapi.io/comparador/productos/productos',
      )
      const productos = await resProductos.json()

      const resRegistros = await fetch(
        'https://684b6f8ded2578be881b5940.mockapi.io/comparador/productos/registros',
      )
      const registrosApi = await resRegistros.json()

      const agrupado = {}
      productos.forEach((item, index) => {
        item.id = item.id || (index + 1).toString()
        const key = item.tipo.trim()
        if (!agrupado[key]) {
          agrupado[key] = []
        }
        agrupado[key].push(item)
      })

      registros.value = registrosApi
      productosPorTipo.value = agrupado

      console.log('✅ Productos cargados en el store:', productosPorTipo.value)
    } catch (error) {
      console.error('Error al cargar productos:', error)
    }
  }

  return {
    productosPorTipo,
    registros,
    grupoFiltrado,
    productosFiltradosPorCategoria,
    categoriasDisponibles,
    categoriasVisibles, // <--- agregado
    productosCargados,
    categoriaSeleccionada,
    cargarProductos,
  }
})
