import React from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { useSelector } from 'react-redux';

function CompletedCounter() {
  const tasks = useSelector(state => state.tasks);
  const completedCount = tasks.filter(task => task.completada).length;
  return <p>Tareas completadas: {completedCount}</p>;
}

function App() {
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h1>TaskBoard</h1>
      <TaskForm />
      <CompletedCounter />
      <TaskList />
    </div>
  );
}

export default App;
