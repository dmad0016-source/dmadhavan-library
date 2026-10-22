<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BHeader from './components/BHeader.vue'

const route = useRoute()

// The Count Book API page shows raw JSON only, like an API response
const showHeader = computed(() => route.name !== 'CountBookAPI')
</script>

<template>
  <div class="main-container">
    <header v-if="showHeader">
      <BHeader />
    </header>
    <main class="main-box">
      <router-view></router-view>
    </main>
  </div>
</template>

<style>
/* Shared layout for every page (moved here from the registration form) */
.main-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
}

.main-box {
  border-radius: 10px;
  padding-bottom: 40px;
}

@media (max-width: 576px) {
  .main-container {
    max-width: 100%;
    padding: 12px;
  }
}
</style>
