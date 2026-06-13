import mongoose from 'mongoose'

const flashcardSessionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  cardsViewed: { type: Number, required: true },
  pdfName: { type: String, default: 'Unknown PDF' },
}, { timestamps: true })

export default mongoose.model('FlashcardSession', flashcardSessionSchema)