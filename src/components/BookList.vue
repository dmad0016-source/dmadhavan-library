<script setup>
import { ref, onMounted } from 'vue'
import { collection, query, where, getDocs } from 'firebase/firestore'
import db from '../firebase/init'

const books = ref([])
const errorMessage = ref(null)

const fetchBooks = async () => {
  try {
    const booksQuery = query(collection(db, 'books'), where('isbn', '>', 1000))
    const snapshot = await getDocs(booksQuery)
    books.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error fetching books:', error)
    errorMessage.value = 'Could not load books.'
  }
}

onMounted(() => {
  fetchBooks()
})
</script>

<template>
  <div class="row mt-5">
    <div class="col-md-6 offset-md-3">
      <h2>Books with ISBN greater than 1000</h2>
      <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
      <ul class="list-group">
        <li v-for="book in books" :key="book.id" class="list-group-item">
          {{ book.name }} - ISBN: {{ book.isbn }}
        </li>
        <li v-if="!books.length && !errorMessage" class="list-group-item text-muted">
          No books found.
        </li>
      </ul>
    </div>
  </div>
</template>
