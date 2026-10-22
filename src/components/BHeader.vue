<script setup>
import { useRouter } from 'vue-router'
import { isAuthenticated, logout } from '../stores/auth'

const router = useRouter()

const handleLogout = () => {
  logout()
  router.push({ name: 'Login' })
}
</script>

<template>
  <!-- Using Bootstrap's Header template (starter code) -->
  <!-- https://getbootstrap.com/docs/5.0/examples/headers/ -->
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills flex-wrap justify-content-center">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page">
            Home (Week 5)
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/json-lab" class="nav-link" active-class="active">JSON Lab</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/FireLogin" class="nav-link" active-class="active">
            Firebase Login
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/FireRegister" class="nav-link" active-class="active">
            Firebase Register
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/addbook" class="nav-link" active-class="active">Add Book</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/GetBookCount" class="nav-link" active-class="active">
            Get Book Count
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/WeatherCheck" class="nav-link" active-class="active">
            Get Weather
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/CountBookAPI" class="nav-link" active-class="active">
            Count Book API
          </router-link>
        </li>
        <li class="nav-item" v-if="isAuthenticated">
          <button type="button" class="nav-link" @click="handleLogout">Logout</button>
        </li>
        <li class="nav-item" v-else>
          <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
        </li>
      </ul>
    </header>
  </div>
</template>
