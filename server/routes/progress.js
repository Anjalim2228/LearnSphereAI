import express from 'express'
import verifyToken from '../middleware/auth.js'
import QuizResult from '../models/QuizResult.js'
import FlashcardSession from '../models/FlashcardSession.js'
import RoadmapSession from '../models/RoadmapSession.js'
import PDFUpload from '../models/PDFUpload.js'

const router = express.Router()

// Save quiz result
router.post('/quiz', verifyToken, async (req, res) => {
  try {
    const { score, total, pdfName } = req.body
    const result = await QuizResult.create({ userId: req.userId, score, total, pdfName })
    res.json({ success: true, result })
  } catch (err) {
    res.status(500).json({ error: 'Failed to save quiz result' })
  }
})

// Save flashcard session
router.post('/flashcard', verifyToken, async (req, res) => {
  try {
    const { cardsViewed, pdfName } = req.body
    const session = await FlashcardSession.create({ userId: req.userId, cardsViewed, pdfName })
    res.json({ success: true, session })
  } catch (err) {
    res.status(500).json({ error: 'Failed to save flashcard session' })
  }
})

// Save roadmap session
router.post('/roadmap', verifyToken, async (req, res) => {
  try {
    const { pdfName } = req.body
    const session = await RoadmapSession.create({ userId: req.userId, pdfName })
    res.json({ success: true, session })
  } catch (err) {
    res.status(500).json({ error: 'Failed to save roadmap session' })
  }
})

// Save PDF upload
router.post('/pdf', verifyToken, async (req, res) => {
  try {
    const { pdfName } = req.body
    const upload = await PDFUpload.create({ userId: req.userId, pdfName })
    res.json({ success: true, upload })
  } catch (err) {
    res.status(500).json({ error: 'Failed to save PDF upload' })
  }
})

// Get all progress
router.get('/summary', verifyToken, async (req, res) => {
  try {
    const userId = req.userId
    const quizzes = await QuizResult.find({ userId }).sort({ createdAt: -1 })
    const flashcards = await FlashcardSession.find({ userId }).sort({ createdAt: -1 })
    const roadmaps = await RoadmapSession.find({ userId }).sort({ createdAt: -1 })
    const pdfs = await PDFUpload.find({ userId }).sort({ createdAt: -1 })

    const totalQuizzes = quizzes.length
    const avgScore = totalQuizzes > 0 ? Math.round(quizzes.reduce((a, b) => a + (b.score / b.total) * 100, 0) / totalQuizzes) : 0
    const totalFlashcards = flashcards.reduce((a, b) => a + b.cardsViewed, 0)
    const totalPDFs = pdfs.length

    res.json({
      totalQuizzes,
      avgScore,
      totalFlashcards,
      totalPDFs,
      quizzes,
      flashcards,
      roadmaps,
      pdfs
    })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch progress' })
  }
})

// Get history
router.get('/history', verifyToken, async (req, res) => {
  try {
    const userId = req.userId
    const quizzes = await QuizResult.find({ userId }).sort({ createdAt: -1 }).limit(20)
    const flashcards = await FlashcardSession.find({ userId }).sort({ createdAt: -1 }).limit(20)
    const roadmaps = await RoadmapSession.find({ userId }).sort({ createdAt: -1 }).limit(20)
    const pdfs = await PDFUpload.find({ userId }).sort({ createdAt: -1 }).limit(20)

    const history = [
      ...quizzes.map(q => ({ type: 'quiz', icon: '🧠', text: `Quiz — Score ${q.score}/${q.total}`, pdf: q.pdfName, date: q.createdAt })),
      ...flashcards.map(f => ({ type: 'flashcard', icon: '🃏', text: `Flashcards — ${f.cardsViewed} cards viewed`, pdf: f.pdfName, date: f.createdAt })),
      ...roadmaps.map(r => ({ type: 'roadmap', icon: '🗺️', text: `Roadmap generated`, pdf: r.pdfName, date: r.createdAt })),
      ...pdfs.map(p => ({ type: 'pdf', icon: '📄', text: `PDF uploaded — ${p.pdfName}`, pdf: p.pdfName, date: p.createdAt })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date))

    res.json({ history })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch history' })
  }
})

export default router