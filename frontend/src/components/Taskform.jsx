import React from 'react';
import { useState } from 'react';

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');

  const handleSubmit = e => {
    e.preventDefault();
    if (!title) return;
    onAdd({ title, description, priority });
    setTitle(''); setDescription(''); setPriority('Medium');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required />
      <input placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
      <select value={priority} onChange={e=>setPriority(e.target.value)}>
        <option>Low</option><option>Medium</option><option>High</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}
