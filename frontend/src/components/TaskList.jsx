import TaskItem from './TaskItem';
import React from 'react';

export default function TaskList({ tasks, onToggle, onDelete }) {
  if (!tasks?.length) return <div>No tasks found.</div>;
  return (
    <div className="task-list">
      {tasks.map(task =>
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      )}
    </div>
  );
}
