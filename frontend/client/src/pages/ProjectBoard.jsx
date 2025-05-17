import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const socket = io('http://localhost:5000');
const statuses = ['To Do', 'In Progress', 'Done'];

export default function ProjectBoard() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
    status: 'To Do'
  });

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get(\`http://localhost:5000/api/tasks/\${id}\`, {
      headers: { Authorization: 'Bearer ' + token }
    });
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
    socket.emit('joinProject', id);
    socket.on('taskCreated', (task) => setTasks(prev => [...prev, task]));
    socket.on('taskUpdated', (updatedTask) => {
      setTasks(prev => prev.map(t => t._id === updatedTask._id ? updatedTask : t));
    });
    return () => socket.disconnect();
  }, []);

  const createTask = async () => {
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:5000/api/tasks', {
      ...newTask,
      projectId: id
    }, {
      headers: { Authorization: 'Bearer ' + token }
    });
    setNewTask({ title: '', description: '', dueDate: '', priority: 'Medium', status: 'To Do' });
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const { draggableId, destination } = result;
    const token = localStorage.getItem('token');
    await axios.patch(\`http://localhost:5000/api/tasks/\${draggableId}\`, {
      status: destination.droppableId
    }, {
      headers: { Authorization: 'Bearer ' + token }
    });
  };

  return (
    <div style={{ padding: '2rem', background: 'linear-gradient(to right, #c2e9fb, #a1c4fd)', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: '1rem' }}>Project Board</h1>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <input placeholder="Task title" value={newTask.title} onChange={e => setNewTask({ ...newTask, title: e.target.value })} />
        <input placeholder="Description" value={newTask.description} onChange={e => setNewTask({ ...newTask, description: e.target.value })} />
        <input type="date" value={newTask.dueDate} onChange={e => setNewTask({ ...newTask, dueDate: e.target.value })} />
        <select value={newTask.priority} onChange={e => setNewTask({ ...newTask, priority: e.target.value })}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <button onClick={createTask}>Add Task</button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {statuses.map(status => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} style={{ flex: 1, background: '#fff', padding: '1rem', borderRadius: '8px' }}>
                  <h3>{status}</h3>
                  {tasks.filter(task => task.status === status).map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(prov) => (
                        <div
                          ref={prov.innerRef}
                          {...prov.draggableProps}
                          {...prov.dragHandleProps}
                          style={{
                            borderLeft: \`4px solid \${task.priority === 'High' ? 'red' : task.priority === 'Medium' ? 'orange' : 'green'}\`,
                            padding: '0.5rem',
                            marginBottom: '0.5rem',
                            background: '#f4f4f4',
                            borderRadius: '4px',
                            ...prov.draggableProps.style
                          }}
                        >
                          <h4>{task.title}</h4>
                          <p>{task.description}</p>
                          <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}