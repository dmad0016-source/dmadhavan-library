<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { OPENWEATHER_API_KEY } from '../config'
import ConfigNotice from '../components/ConfigNotice.vue'

const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather'

const city = ref('')
const weatherData = ref(null)
const errorMessage = ref(null)

// units=metric makes the API return degrees Celsius
const temperature = computed(() =>
  weatherData.value ? Math.round(weatherData.value.main.temp) : null
)

const iconCode = computed(() => (weatherData.value ? weatherData.value.weather[0].icon : null))

const iconUrl = computed(() =>
  iconCode.value ? `https://openweathermap.org/payload/api/media/file/${iconCode.value}.png` : null
)

const fallbackIconUrl = computed(() =>
  iconCode.value ? `https://openweathermap.org/img/wn/${iconCode.value}@2x.png` : null
)

// If the first icon address fails, try the older one once
const onIconError = (event) => {
  if (event.target.src !== fallbackIconUrl.value) event.target.src = fallbackIconUrl.value
}

const fetchWeatherData = async (url) => {
  try {
    const response = await axios.get(url)
    weatherData.value = response.data
    errorMessage.value = null
  } catch (error) {
    console.error('Error fetching weather data:', error)
    errorMessage.value =
      error.response?.status === 404
        ? 'City not found.'
        : 'Could not load the weather. Check your API key (new keys can take up to 2 hours).'
  }
}

const searchByCity = async () => {
  const cityName = city.value.trim()
  if (!cityName) return
  const url = `${WEATHER_URL}?q=${encodeURIComponent(cityName)}&units=metric&appid=${OPENWEATHER_API_KEY}`
  await fetchWeatherData(url)
}

const fetchCurrentLocationWeather = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords
      const url = `${WEATHER_URL}?lat=${latitude}&lon=${longitude}&units=metric&appid=${OPENWEATHER_API_KEY}`
      await fetchWeatherData(url)
    })
  }
}

onMounted(() => {
  if (OPENWEATHER_API_KEY) fetchCurrentLocationWeather()
})
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3 text-center">
        <h1>Weather Check</h1>
        <ConfigNotice v-if="!OPENWEATHER_API_KEY" setting="VITE_OPENWEATHER_API_KEY" />

        <form class="d-flex gap-2 mb-4" @submit.prevent="searchByCity">
          <input
            type="text"
            class="form-control"
            v-model="city"
            placeholder="Enter a city, e.g. Melbourne"
            aria-label="City"
          />
          <button type="submit" class="btn btn-primary" :disabled="!OPENWEATHER_API_KEY">
            Search
          </button>
        </form>

        <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

        <!-- Field names follow the API response: https://openweathermap.org/current -->
        <div v-if="weatherData">
          <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
          <div>
            <img :src="iconUrl" alt="Weather Icon" @error="onIconError" />
            <p class="fs-3">{{ temperature }} °C</p>
          </div>
          <span class="text-capitalize">{{ weatherData.weather[0].description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
