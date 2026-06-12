import mongoose from 'mongoose'

const pdfUploadSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  pdfName: { type: String, required: true },
}, { timestamps: true })

export default mongoose.model('PDFUpload', pdfUploadSchema)