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


router.post('/generate-flashcards', async (req, res) => {
  try {
    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: `You are a flashcard generator. Generate 10 flashcards from the given document.
          Respond ONLY with a JSON array, no extra text:
          [
            {
              "front": "Question or concept here?",
              "back": "Answer or explanation here."
            }
          ]`
        },
        {
          role: 'user',
          content: `Generate 10 flashcards from this document. Random seed: ${Date.now()}\n\n${pdfText}`
        }
      ]
    })
    const text = response.choices[0].message.content
    const clean = text.replace(/```json|```/g, '').trim()
    const flashcards = JSON.parse(clean)
    res.json({ flashcards })
  } catch (err) {
    console.error('FLASHCARD ERROR:', err)
    res.status(500).json({ error: 'Flashcard generation failed' })
  }
})


router.post('/generate-roadmap', async (req, res) => {
  try {
    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: `You are a study planner. Generate a 5-day study roadmap from the given document.
          Respond ONLY with a JSON array, no extra text:
          [
            {
              "day": "Day 1",
              "title": "Topic title here",
              "tasks": ["Task 1", "Task 2", "Task 3"],
              "done": false
            }
          ]`
        },
        {
          role: 'user',
          content: `Generate a 5-day study roadmap from this document:\n\n${pdfText}`
        }
      ]
    })
    const text = response.choices[0].message.content
    const clean = text.replace(/```json|```/g, '').trim()
    const roadmap = JSON.parse(clean)
    res.json({ roadmap })
  } catch (err) {
    console.error('ROADMAP ERROR:', err)
    res.status(500).json({ error: 'Roadmap generation failed' })
  }
})



router.post('/generate-visual', async (req, res) => {
  try {
    const { type } = req.body // 'tree', 'mindmap', 'bullets', 'graph'

    let instruction = ''
    if (type === 'tree') {
      instruction = `Create a tree diagram structure from this document. Respond ONLY with JSON in this format, no extra text:
      {
        "title": "Main Topic",
        "children": [
          { "title": "Subtopic 1", "children": [ { "title": "Point A" }, { "title": "Point B" } ] },
          { "title": "Subtopic 2", "children": [ { "title": "Point C" } ] }
        ]
      }`
    } else if (type === 'mindmap') {
      instruction = `Create a mind map structure from this document. Respond ONLY with JSON in this format, no extra text:
      {
        "title": "Central Idea",
        "branches": [
          { "label": "Branch 1", "points": ["point a", "point b"] },
          { "label": "Branch 2", "points": ["point c"] }
        ]
      }`
    } else if (type === 'bullets') {
      instruction = `Summarize this document as short bullet points grouped by topic. Respond ONLY with JSON in this format, no extra text:
      {
        "sections": [
          { "heading": "Topic 1", "points": ["short point 1", "short point 2"] },
          { "heading": "Topic 2", "points": ["short point 3"] }
        ]
      }`
    } else if (type === 'graph') {
      instruction = `Extract any numeric/comparable data from this document suitable for a bar chart. If no real data exists, create a relevance/importance score (1-10) for key topics instead. Respond ONLY with JSON in this format, no extra text:
      {
        "title": "Chart Title",
        "data": [
          { "label": "Item 1", "value": 8 },
          { "label": "Item 2", "value": 5 }
        ]
      }`
    } else {
      return res.status(400).json({ error: 'Invalid type' })
    }

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: instruction },
        { role: 'user', content: `Document:\n\n${pdfText}` }
      ]
    })

    const text = response.choices[0].message.content
    const cleaned = text.replace(/```json|```/g, '').trim()
    const data = JSON.parse(cleaned)
    res.json({ type, data })
  } catch (err) {
    console.error('VISUAL GEN ERROR:', err)
    res.status(500).json({ error: 'Visual generation failed' })
  }
})

export default router