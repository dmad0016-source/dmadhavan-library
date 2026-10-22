import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { isAuthenticated } from '../stores/auth'

// Pages other than Home are lazy-loaded, so each one downloads only when visited
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/access-denied',
    name: 'AccessDenied',
    component: () => import('../views/AccessDeniedView.vue')
  },
  {
    path: '/json-lab',
    name: 'JSONLab',
    component: () => import('../components/JSONLab.vue')
  },
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: () => import('../views/FirebaseSigninView.vue')
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: () => import('../views/FirebaseRegisterView.vue')
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: () => import('../views/AddBookView.vue')
  },
  {
    path: '/GetBookCount',
    name: 'GetBookCount',
    component: () => import('../views/GetBookCountView.vue')
  },
  {
    path: '/WeatherCheck',
    name: 'GetWeather',
    component: () => import('../views/WeatherView.vue')
  },
  {
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component: () => import('../views/CountBookAPI.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  // BASE_URL is '/' locally and '/<repository-name>/' on GitHub Pages
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Global guard: pages marked requiresAuth need the Week 5 login
router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return { name: 'AccessDenied', query: { redirect: to.fullPath } }
  }
})

export default router
