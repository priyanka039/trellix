import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBZkXAA4VMcOIL9nET3JT10B0eZiV9VlcI",
  authDomain: "trellix-73d48.firebaseapp.com",
  projectId: "trellix-73d48",
  storageBucket: "trellix-73d48.firebasestorage.app",
  messagingSenderId: "250689975134",
  appId: "1:250689975134:web:3ed1008e06e848656cd5cf",
  measurementId: "G-HLJRS422H6"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
