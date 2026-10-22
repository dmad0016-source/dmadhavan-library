<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { isFirebaseConfigured } from '../firebase/init'
import ConfigNotice from '../components/ConfigNotice.vue'

const email = ref('')
const password = ref('')
const errorMessage = ref(null)
const currentUserEmail = ref(null)
let stopAuthListener = null

const signin = () => {
  const auth = getAuth()
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log('Firebase Login Successful!')
      console.log(auth.currentUser) // check the browser console to see who is signed in
      errorMessage.value = null
      password.value = ''
    })
    .catch((error) => {
      console.log(error.code)
      errorMessage.value = error.code
    })
}

const signout = () => {
  signOut(getAuth())
}

onMounted(() => {
  if (!isFirebaseConfigured) return
  stopAuthListener = onAuthStateChanged(getAuth(), (user) => {
    currentUserEmail.value = user ? user.email : null
  })
})

onBeforeUnmount(() => {
  if (stopAuthListener) stopAuthListener()
})
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h1 class="text-center">Sign in</h1>
        <ConfigNotice v-if="!isFirebaseConfigured" setting="VITE_FIREBASE_* keys" />

        <div v-if="currentUserEmail" class="alert alert-success">
          Signed in as <strong>{{ currentUserEmail }}</strong>
          <button type="button" class="btn btn-sm btn-outline-secondary ms-2" @click="signout">
            Sign out
          </button>
        </div>

        <form v-else @submit.prevent="signin">
          <div class="mb-3">
            <label for="signin-email" class="form-label">Email</label>
            <input type="email" class="form-control" id="signin-email" v-model="email" required />
          </div>
          <div class="mb-3">
            <label for="signin-password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="signin-password"
              v-model="password"
              required
            />
          </div>
          <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary" :disabled="!isFirebaseConfigured">
              Sign in via Firebase
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
