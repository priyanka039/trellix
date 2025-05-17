import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function BadgesDisplay() {
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/auth/user', {
      headers: { Authorization: 'Bearer ' + token }
    }).then(res => setBadges(res.data.badges));
  }, []);

  return (
    <div style={{ marginTop: '1rem', background: '#e6ffe6', padding: '1rem', borderRadius: '8px' }}>
      <h4>Your Badges</h4>
      <ul style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {badges.map((b, i) => <li key={i} style={{ background: '#d1e7dd', padding: '0.5rem 1rem', borderRadius: '20px' }}>{b}</li>)}
      </ul>
    </div>
  );
}