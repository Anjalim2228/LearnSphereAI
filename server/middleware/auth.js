import { getAuth } from '../firebaseAdmin.js'

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1]
    if (!token) return res.status(401).json({ error: 'No token provided' })
    
    const decoded = await getAuth().verifyIdToken(token)
    req.userId = decoded.uid
    next()
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' })
  }
}

export default verifyToken