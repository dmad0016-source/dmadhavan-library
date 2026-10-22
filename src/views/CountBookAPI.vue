<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { COUNT_BOOKS_URL } from '../config'

const jsondata = ref(null)

const getBookCountAPI = async () => {
  if (!COUNT_BOOKS_URL) {
    jsondata.value = JSON.stringify({ error: 'VITE_COUNT_BOOKS_URL is not set' }, null, 2)
    return
  }
  try {
    const response = await axios.get(COUNT_BOOKS_URL)
    jsondata.value = JSON.stringify(response.data, null, 2)
  } catch (err) {
    console.error('Error fetching book count:', err)
    jsondata.value = JSON.stringify({ error: 'Error fetching book count' }, null, 2)
  }
}

// An API page loads its data straight away instead of waiting for a click
onMounted(() => {
  getBookCountAPI()
})
</script>

<template>
  <pre>{{ jsondata }}</pre>
</template>
