// src/components/TaskList.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';

export default function TaskList() {
  const tasks = useSelector(state => state.tasks);
  const sortedTasks = [...tasks].sort((a, b) => a.completada - b.completada);

  return (
    <ul>
      {sortedTasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}

