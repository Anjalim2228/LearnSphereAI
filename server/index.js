import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import chatRoute from './routes/chat.js'
import progressRoute from './routes/progress.js'
import connectDB from './db.js'

connectDB()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api', chatRoute)
app.use('/api', progressRoute)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))