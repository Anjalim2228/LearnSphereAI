import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const serviceAccount = require('./serviceAccountKey.json')
const { initializeApp, cert } = require('firebase-admin/app')
const { getAuth } = require('firebase-admin/auth')

initializeApp({
  credential: cert(serviceAccount)
})

export { getAuth }