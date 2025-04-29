import React, { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import TaskForm from '../components/Taskform';
import TaskList from '../components/TaskList';
import FilterBar from '../components/FilterBar';
import { useAuth } from '../context/AuthContext';

const FILTER_MAP = {
  All: () => true,
  Active: task => task.status === 'incomplete',
  Completed: task => task.status === 'complete'
};

export default function Dashboard() {
  const [status, setStatus] = useState('All');
  const { tasks = [], add, update, remove, isLoading } = useTasks(status);
  const { logout, user } = useAuth();

  const handleAdd = data => add.mutate(data);

  // Make sure to use task.id, not task._id
  const handleToggle = task =>
    update.mutate({ id: task.id, data: { status: task.status === 'complete' ? 'incomplete' : 'complete' } });

  const handleDelete = id => remove.mutate(id);

  // If your backend already filters by status, you don't need to filter here.
  // If you want to filter on the frontend, uncomment the next line:
  const filteredTasks = tasks.filter(FILTER_MAP[status]);

  return (
    <div>
      <header>
        <h1>Task Manager</h1>
        <span>{user.email}</span>
        <button onClick={logout}>Logout</button>
      </header>
      <FilterBar status={status} setStatus={setStatus} />
      <TaskForm onAdd={handleAdd} />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <TaskList
          tasks={tasks /* or filteredTasks if filtering on frontend */}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
