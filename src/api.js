import { auth } from './firebase/config'

const BASE_URL = 'https://learnsphereai-1.onrender.com/api'

export const getToken = async () => {
  const token = await auth.currentUser?.getIdToken()
  return token
}

export const saveQuizResult = async (score, total, pdfName) => {
  const token = await getToken()
  await fetch(`${BASE_URL}/progress/quiz`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ score, total, pdfName })
  })
}

export const saveFlashcardSession = async (cardsViewed, pdfName) => {
  const token = await getToken()
  await fetch(`${BASE_URL}/progress/flashcard`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ cardsViewed, pdfName })
  })
}

export const saveRoadmap = async (pdfName) => {
  const token = await getToken()
  await fetch(`${BASE_URL}/progress/roadmap`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ pdfName })
  })
}

export const savePDFUpload = async (pdfName) => {
  const token = await getToken()
  await fetch(`${BASE_URL}/progress/pdf`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ pdfName })
  })
}

export const getProgressSummary = async () => {
  const token = await getToken()
  const res = await fetch(`${BASE_URL}/progress/summary`, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  return res.json()
}

export const getHistory = async () => {
  const token = await getToken()
  const res = await fetch(`${BASE_URL}/progress/history`, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  return res.json()
}

export const saveUser = async (email, name, photoURL) => {
  const token = await getToken()
  await fetch(`${BASE_URL}/progress/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ email, name, photoURL })
  })
}