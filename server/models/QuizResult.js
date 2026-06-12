import mongoose from 'mongoose'

const quizResultSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  pdfName: { type: String, default: 'Unknown PDF' },
}, { timestamps: true })

export default mongoose.model('QuizResult', quizResultSchema)