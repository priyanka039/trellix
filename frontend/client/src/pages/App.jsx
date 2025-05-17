import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';

function App() {
  const user = localStorage.getItem('token');

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
      <Route path="/project/:id" element={user ? <ProjectBoard /> : <Navigate to="/login" />} />
</Routes>
  );
}

export default App;