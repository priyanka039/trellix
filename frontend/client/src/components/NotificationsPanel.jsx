import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function NotificationsPanel() {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/api/notifications', {
      headers: { Authorization: 'Bearer ' + token }
    });
    setNotifications(res.data);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div style={{ background: '#fff', padding: '1rem', borderRadius: '8px' }}>
      <h3>Notifications</h3>
      <ul>
        {notifications.map(n => (
          <li key={n._id} style={{ marginBottom: '0.5rem' }}>
            {n.message} <span style={{ color: n.read ? 'gray' : 'red' }}>{n.read ? '' : '•'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}