import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Values come from .env.local (see .env.example), so keys stay out of Git
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId)

// Without a config the rest of the app still runs; Firebase pages show a notice
let db = null
if (isFirebaseConfigured) {
  initializeApp(firebaseConfig)
  db = getFirestore()
} else {
  console.warn('Firebase is not configured: copy .env.example to .env.local and add your keys.')
}

export default db
