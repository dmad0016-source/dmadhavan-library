<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { isFirebaseConfigured } from '../firebase/init'
import ConfigNotice from '../components/ConfigNotice.vue'

const email = ref('')
const password = ref('')
const errorMessage = ref(null)
const router = useRouter()

const register = () => {
  const auth = getAuth()
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log('Firebase Register Successful!')
      router.push('/FireLogin')
    })
    .catch((error) => {
      console.log(error.code)
      errorMessage.value = error.code
    })
}
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h1 class="text-center">Create an Account</h1>
        <ConfigNotice v-if="!isFirebaseConfigured" setting="VITE_FIREBASE_* keys" />
        <form @submit.prevent="register">
          <div class="mb-3">
            <label for="register-email" class="form-label">Email</label>
            <input type="email" class="form-control" id="register-email" v-model="email" required />
          </div>
          <div class="mb-3">
            <label for="register-password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="register-password"
              v-model="password"
              minlength="6"
              required
            />
            <div class="form-text">Firebase needs at least 6 characters.</div>
          </div>
          <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary" :disabled="!isFirebaseConfigured">
              Save to Firebase
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
