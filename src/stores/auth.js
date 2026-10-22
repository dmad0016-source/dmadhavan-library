import { ref } from 'vue'

// Hardcoded demo credentials for the Week 5 login task.
// Real accounts use Firebase Authentication (Firebase Login page).
export const DEMO_USERNAME = 'admin'
export const DEMO_PASSWORD = 'password123'

// sessionStorage keeps the user logged in across page refreshes in this tab
const STORAGE_KEY = 'nomash-authenticated'

const readStoredState = () => {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

const saveState = (value) => {
  try {
    sessionStorage.setItem(STORAGE_KEY, String(value))
  } catch {
    // Storage can be blocked (e.g. private mode); the in-memory state still works
  }
}

export const isAuthenticated = ref(readStoredState())

export const login = (username, password) => {
  const isValid = username === DEMO_USERNAME && password === DEMO_PASSWORD
  isAuthenticated.value = isValid
  saveState(isValid)
  return isValid
}

export const logout = () => {
  isAuthenticated.value = false
  saveState(false)
}
