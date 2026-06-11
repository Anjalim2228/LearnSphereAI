import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCk7S0YtHxnfkEfXgHQOabvl6RdwRXYbUE",
  authDomain: "learnsphere-ai-34f12.firebaseapp.com",
  projectId: "learnsphere-ai-34f12",
  storageBucket: "learnsphere-ai-34f12.firebasestorage.app",
  messagingSenderId: "185697218433",
  appId: "1:185697218433:web:c86a6a560ccd5548bd0280"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export default app