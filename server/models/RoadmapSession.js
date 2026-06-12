import mongoose from 'mongoose'

const roadmapSessionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  pdfName: { type: String, default: 'Unknown PDF' },
  days: { type: Number, default: 5 },
}, { timestamps: true })

export default mongoose.model('RoadmapSession', roadmapSessionSchema)