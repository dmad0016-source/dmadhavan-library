<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { login, DEMO_USERNAME, DEMO_PASSWORD } from '../stores/auth'

const username = ref('')
const password = ref('')
const errorMessage = ref(null)

const route = useRoute()
const router = useRouter()

const handleLogin = () => {
  if (login(username.value, password.value)) {
    errorMessage.value = null
    // Return to the page the user originally asked for, if any
    router.push(route.query.redirect || '/about')
  } else {
    errorMessage.value = 'Invalid username or password.'
  }
}
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h1 class="text-center">Login</h1>
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="login-username" class="form-label">Username</label>
            <input type="text" class="form-control" id="login-username" v-model="username" />
          </div>
          <div class="mb-3">
            <label for="login-password" class="form-label">Password</label>
            <input type="password" class="form-control" id="login-password" v-model="password" />
          </div>
          <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
        </form>
        <p class="text-muted text-center mt-3">
          Demo login: <code>{{ DEMO_USERNAME }}</code> / <code>{{ DEMO_PASSWORD }}</code>
        </p>
      </div>
    </div>
  </div>
</template>
