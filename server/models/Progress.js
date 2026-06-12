import mongoose from 'mongoose'

const progressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  quizzesTaken: { type: Number, default: 0 },
  totalScore: { type: Number, default: 0 },
  flashcardsViewed: { type: Number, default: 0 },
  roadmapsGenerated: { type: Number, default: 0 },
  pdfsUploaded: { type: Number, default: 0 },
  lastActive: { type: Date, default: Date.now }
}, { timestamps: true })

export default mongoose.model('Progress', progressSchema)