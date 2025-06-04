import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchStore = defineStore('search', () => {
  const query = ref('')

  function setQuery(newQuery) {
    query.value = newQuery
  }

  return { query, setQuery }
})
