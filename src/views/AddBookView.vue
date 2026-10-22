<script setup>
import { ref } from 'vue'
import { collection, addDoc } from 'firebase/firestore'
import db, { isFirebaseConfigured } from '../firebase/init'
import BookList from '../components/BookList.vue'
import ConfigNotice from '../components/ConfigNotice.vue'

const isbn = ref(null)
const name = ref('')
const statusMessage = ref(null)
const errorMessage = ref(null)

// Changing the key re-mounts BookList, so it reloads after a book is added
const bookListKey = ref(0)

const addBook = async () => {
  const isbnNumber = Number(isbn.value)
  if (!Number.isInteger(isbnNumber) || isbnNumber <= 0) {
    errorMessage.value = 'ISBN must be a positive whole number.'
    return
  }

  try {
    // ISBN is stored as a number so it can be queried with where('isbn', '>', 1000)
    await addDoc(collection(db, 'books'), { isbn: isbnNumber, name: name.value })
    statusMessage.value = `Added "${name.value}".`
    errorMessage.value = null
    isbn.value = null
    name.value = ''
    bookListKey.value++
  } catch (error) {
    console.error('Error adding book:', error)
    errorMessage.value = 'Could not add the book. Check the Firestore rules and your config.'
  }
}
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h1 class="text-center">Add Book</h1>
        <ConfigNotice v-if="!isFirebaseConfigured" setting="VITE_FIREBASE_* keys" />
        <form @submit.prevent="addBook">
          <div class="mb-3">
            <label for="isbn" class="form-label">ISBN</label>
            <input type="number" class="form-control" id="isbn" v-model.number="isbn" required />
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control" id="name" v-model="name" required />
          </div>
          <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
          <div v-if="statusMessage" class="alert alert-success">{{ statusMessage }}</div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary" :disabled="!isFirebaseConfigured">
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>

    <BookList v-if="isFirebaseConfigured" :key="bookListKey" />
  </div>
</template>
