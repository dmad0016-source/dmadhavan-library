// Read from .env.local when running locally, and from the hosting
// provider's environment variables when deployed (see README.md)
export const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || ''
export const COUNT_BOOKS_URL = import.meta.env.VITE_COUNT_BOOKS_URL || ''
