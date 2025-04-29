import React from 'react';
export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className={`task-item ${task.status}`}>
      <input
        type="checkbox"
        checked={task.status === 'complete'}
        onChange={() => onToggle(task)}
      />
      <div>
        <strong>{task.title}</strong>
        <div>{task.description}</div>
        <span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span>
      </div>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
}
