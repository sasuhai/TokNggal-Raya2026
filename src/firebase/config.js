import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBi_ItaBB2s3RL1bWzOngGAnCNsQxqyPj8",
  authDomain: "toknggal-raya2026.firebaseapp.com",
  projectId: "toknggal-raya2026",
  storageBucket: "toknggal-raya2026.firebasestorage.app",
  messagingSenderId: "711198455153",
  appId: "1:711198455153:web:025b68744307cc735ab2d0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
