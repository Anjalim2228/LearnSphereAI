# 🎓 LearnSphere AI

An AI-powered study assistant that transforms your PDFs and YouTube videos into interactive learning materials.

## ✨ Features

- 📄 **PDF Upload** — Upload any PDF and chat with it
- ▶️ **YouTube Support** — Paste any YouTube link and learn from it
- 🤖 **AI Chat** — Ask anything about your document
- 📝 **Quiz Generator** — Auto-generate MCQ questions
- 🃏 **Flashcards** — Create flashcards instantly
- 🗺️ **Study Roadmap** — Get a personalized day-by-day study plan
- 🌳 **Visual Notes** — Tree Diagram, Mind Map, Bullet Points, Graph
- ⬇️ **PDF Download** — Download your visual notes as PDF

## 🛠️ Tech Stack

**Frontend**
- React.js
- Vite
- Firebase Authentication

**Backend**
- Node.js
- Express.js
- Groq AI (llama-3.1-8b-instant)
- PDF Parse
- YouTube Transcript
- Nodemailer

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- Groq API Key (free at groq.com)
- Firebase project setup

### Installation

**Clone the repo**
\```bash
git clone https://github.com/Anjalim2228/LearnSphereAI.git
cd LearnSphereAI
\```

**Frontend setup**
\```bash
npm install
npm run dev
\```

**Backend setup**
\```bash
cd server
npm install
npm run dev
\```

### Environment Variables

Create `server/.env` file:
\```
GROQ_API_KEY=your_groq_api_key
EMAIL_USER=your_gmail
EMAIL_PASS=your_app_password
\```

Create `.env` file in root (frontend):
\```
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
\```

## 📸 Screenshots

Coming soon...

## 🙏 Acknowledgements

- [Groq](https://groq.com) for blazing fast AI inference
- [Firebase](https://firebase.google.com) for authentication
- [Vercel](https://vercel.com) for frontend hosting
- [Render](https://render.com) for backend hosting

## 📬 Contact

Made with ❤️ by Anjali
