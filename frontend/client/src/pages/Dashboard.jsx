import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const fetchProjects = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/api/projects', {
      headers: { Authorization: 'Bearer ' + token }
    });
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = async () => {
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:5000/api/projects', { title, description }, {
      headers: { Authorization: 'Bearer ' + token }
    });
    setTitle('');
    setDescription('');
    fetchProjects();
  };

  return (
    <div style={{ padding: '2rem', background: 'linear-gradient(to right, #ffecd2, #fcb69f)', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Your Projects</h1>

      <div style={{ marginBottom: '2rem' }}>
        <input placeholder="Project title" value={title} onChange={e => setTitle(e.target.value)} />
        <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <button onClick={handleCreateProject}>Create</button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {projects.map(p => (
          <div key={p._id} onClick={() => navigate(`/project/${p._id}`)} style={{ background: '#fff', padding: '1rem', borderRadius: '8px', cursor: 'pointer' }}>
            <h2>{p.title}</h2>
            <p>{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}