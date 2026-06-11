import 'dotenv/config'
import express from 'express'
import multer from 'multer'
import Groq from 'groq-sdk'
import fs from 'fs'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const pdfParse = require('pdf-parse').default || require('pdf-parse')

const router = express.Router()
const upload = multer({ dest: 'uploads/' })
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

let pdfText = ''

router.post('/upload', upload.single('pdf'), async (req, res) => {
  try {
    const dataBuffer = fs.readFileSync(req.file.path)
    const data = await pdfParse(dataBuffer)
    pdfText = data.text
    fs.unlinkSync(req.file.path)
    res.json({ success: true, message: 'PDF uploaded successfully!' })
  } catch (err) {
    console.error('UPLOAD ERROR:', err)
    res.status(500).json({ error: 'PDF processing failed' })
  }
})

router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body
    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: `You are a helpful study assistant. Answer questions based on this document:\n\n${pdfText}` },
        { role: 'user', content: message }
      ]
    })
    res.json({ reply: response.choices[0].message.content })
  } catch (err) {
    console.error('CHAT ERROR:', err)
    res.status(500).json({ error: 'AI response failed' })
  }
})

router.post('/generate-quiz', async (req, res) => {
  try {
    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: `You are a quiz generator. Generate 10 MCQ questions from the given document. 
          Respond ONLY with a JSON array like this, no extra text:
          [
            {
              "question": "Question here?",
              "options": ["A", "B", "C", "D"],
              "answer": 0
            }
          ]`
        },
        {
          role: 'user',
          content: `Generate 10 different and unique MCQ questions from this document. Each time generate completely new questions, do not repeat previous ones. Random seed: ${Date.now()}\n\n${pdfText}`
        }
      ]
    })
    const text = response.choices[0].message.content
    const quiz = JSON.parse(text)
    res.json({ quiz })
  } catch (err) {
    console.error('QUIZ ERROR:', err)
    res.status(500).json({ error: 'Quiz generation failed' })
  }
})

export default router