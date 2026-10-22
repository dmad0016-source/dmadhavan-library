<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { COUNT_BOOKS_URL } from '../config'
import ConfigNotice from '../components/ConfigNotice.vue'

const count = ref(null)
const error = ref(null)

const getBookCount = async () => {
  try {
    const response = await axios.get(COUNT_BOOKS_URL)
    count.value = response.data.count
    error.value = null
  } catch (err) {
    console.error('Error fetching book count:', err)
    error.value = 'Error fetching book count'
    count.value = null
  }
}
</script>

<template>
  <div class="container mt-5 text-center">
    <h1>Book Counter</h1>
    <ConfigNotice v-if="!COUNT_BOOKS_URL" setting="VITE_COUNT_BOOKS_URL" />
    <button
      type="button"
      class="btn btn-primary"
      :disabled="!COUNT_BOOKS_URL"
      @click="getBookCount"
    >
      Get Book Count
    </button>
    <p v-if="count !== null" class="mt-3">Total number of books: {{ count }}</p>
    <p v-if="error" class="mt-3 text-danger">{{ error }}</p>
  </div>
</template>
