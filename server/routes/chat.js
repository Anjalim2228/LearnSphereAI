import 'dotenv/config'
import express from 'express'
import multer from 'multer'
import Groq from 'groq-sdk'
import fs from 'fs'
import { createRequire } from 'module'
import { YoutubeTranscript } from 'youtube-transcript'

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
    pdfText = data.text.slice(0, 15000) // limit stored text
    fs.unlinkSync(req.file.path)
    res.json({ success: true, message: 'PDF uploaded successfully!' })
  } catch (err) {
    console.error('UPLOAD ERROR:', err)
    res.status(500).json({ error: 'PDF processing failed' })
  }
})
router.post('/youtube', async (req, res) => {
  try {
    const { url } = req.body
    const transcriptItems = await YoutubeTranscript.fetchTranscript(url)
    const fullText = transcriptItems.map(item => item.text).join(' ')
    pdfText = fullText.slice(0, 15000)
    res.json({ success: true, message: 'YouTube transcript loaded successfully!' })
  } catch (err) {
    console.error('YOUTUBE ERROR:', err)
    res.status(500).json({ error: 'Failed to fetch transcript. Make sure the video has captions/subtitles.' })
  }
})
router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body
    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: `You are a helpful study assistant. Answer questions based on this document:\n\n${pdfText.slice(0, 4000)}` },
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
          content: `Generate 10 different and unique MCQ questions from this document. Each time generate completely new questions, do not repeat previous ones. Random seed: ${Date.now()}\n\n${pdfText.slice(0, 6000)}`
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
          content: `Generate 10 flashcards from this document. Random seed: ${Date.now()}\n\n${pdfText.slice(0, 6000)}`
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
          content: `You are a study planner. Based on the amount of content in the document, generate an appropriate multi-day study roadmap (could be 5, 7, 10, or more days depending on how much content there is — cover everything important, don't limit to a fixed number).
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
          content: `Generate a study roadmap from this document, covering all major topics across as many days as needed:\n\n${pdfText.slice(0, 6000)}`
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
  instruction = `Create a mind map from this document. Identify the central theme, then create ONE branch for EVERY major topic/section/concept covered in the document (do not limit to a fixed number — cover all major topics present). For each branch, give 2-4 short key points (max 5 words each). Respond ONLY with JSON in this format, no extra text:
  {
    "title": "Central Theme",
    "branches": [
      { "label": "Topic Name", "points": ["short point", "short point"] }
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
  instruction = `Create a detailed concept overview diagram from this document. Identify the main topic and create ONE entry for EVERY major topic/section covered in the document (cover all of them, don't limit to a fixed number). For each topic, give a clear 2-3 line explanation in simple language covering what it is and why it matters. Respond ONLY with JSON in this format, no extra text:
  {
    "title": "Main Topic Name",
    "concepts": [
      { "heading": "Topic Name", "explanation": "Clear 2-3 line explanation covering what it is and why it matters." }
    ]
  }`




    } else {
      return res.status(400).json({ error: 'Invalid type' })
    }

    const safeText = pdfText.slice(0, 6000)

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: instruction },
        { role: 'user', content: `Document:\n\n${safeText}` }
      ]
      
    })

   const text = response.choices[0].message.content
let cleaned = text.replace(/```json|```/g, '').trim()

// Extract just the JSON object/array if there's extra text around it
const firstBrace = cleaned.indexOf('{')
const lastBrace = cleaned.lastIndexOf('}')
if (firstBrace !== -1 && lastBrace !== -1) {
  cleaned = cleaned.substring(firstBrace, lastBrace + 1)
}

let data
try {
  data = JSON.parse(cleaned)
} catch (parseErr) {
  console.error('JSON PARSE FAILED. Raw AI response:', text)
  return res.status(500).json({ error: 'AI returned invalid format, please try again' })
}

res.json({ type, data })
  } catch (err) {
    console.error('VISUAL GEN ERROR:', err)
    res.status(500).json({ error: 'Visual generation failed' })
  }
})

export default router