/* eslint-env node */
const { onRequest } = require('firebase-functions/https')
const { initializeApp } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
// origin: true lets the Vue app call this function from any domain
const cors = require('cors')({ origin: true })

initializeApp()

// GET https://<region>-<project-id>.cloudfunctions.net/countBooks -> { "count": 3 }
exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const snapshot = await getFirestore().collection('books').get()
      res.status(200).send({ count: snapshot.size })
    } catch (error) {
      console.error('Error counting books:', error.message)
      res.status(500).send({ error: 'Error counting books' })
    }
  })
})
