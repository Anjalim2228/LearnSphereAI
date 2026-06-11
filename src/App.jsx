import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import PDFChat from './pages/PDFChat'
import Quiz from './pages/Quiz'
import Flashcards from './pages/Flashcards'
import Roadmap from './pages/Roadmap'
import ProtectedRoute from './components/ProtectedRoute'
import Progress from './pages/Progress'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="/progress" element={
  <ProtectedRoute><Progress /></ProtectedRoute>
} />
        <Route path="/pdf-chat" element={
          <ProtectedRoute><PDFChat /></ProtectedRoute>
        } />
        <Route path="/quiz" element={
          <ProtectedRoute><Quiz /></ProtectedRoute>
        } />
        <Route path="/flashcards" element={
          <ProtectedRoute><Flashcards /></ProtectedRoute>
        } />
        <Route path="/roadmap" element={
          <ProtectedRoute><Roadmap /></ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App