<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const REDIRECT_DELAY_MS = 3000

const route = useRoute()
const router = useRouter()
let redirectTimer = null

// Keep the ?redirect= query so the login page can send the user back afterwards
const goToLogin = () => router.push({ name: 'Login', query: route.query })

onMounted(() => {
  redirectTimer = setTimeout(goToLogin, REDIRECT_DELAY_MS)
})

onBeforeUnmount(() => {
  clearTimeout(redirectTimer)
})
</script>

<template>
  <div class="container mt-5 text-center">
    <h1>Access Denied</h1>
    <p>You need to log in to view that page. Redirecting you to the login page...</p>
    <button type="button" class="btn btn-primary" @click="goToLogin">Go to login now</button>
  </div>
</template>
