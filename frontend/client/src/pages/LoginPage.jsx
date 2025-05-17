import React from 'react';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import axios from 'axios';

export default function LoginPage() {
  const handleLogin = async () => {
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();
    const res = await axios.post('http://localhost:5000/api/auth/login', {}, {
      headers: { Authorization: 'Bearer ' + token }
    });
    localStorage.setItem('token', token);
    window.location.href = '/dashboard';
  };

  return (
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(to right, #667eea, #764ba2)' }}>
      <button onClick={handleLogin} style={{ padding: '1em 2em', fontSize: '1.2em', borderRadius: '8px', backgroundColor: '#fff', cursor: 'pointer' }}>
        Sign in with Google
      </button>
    </div>
  );
}