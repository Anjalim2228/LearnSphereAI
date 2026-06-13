import { useEffect, useState } from 'react'
import { auth } from '../firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u))
    return () => unsub()
  }, [])

  if (user === undefined) return null
  if (!user) return <Navigate to="/login" />
  return children
}

export default ProtectedRoute