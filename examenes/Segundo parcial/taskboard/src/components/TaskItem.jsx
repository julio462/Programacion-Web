// src/components/TaskItem.jsx
import React from 'react';
import { useDispatch } from 'react-redux';

export default function TaskItem({ task }) {
  const dispatch = useDispatch();

  return (
    <li style={{ textDecoration: task.completada ? 'line-through' : 'none' }}>
      {task.titulo}
      <button onClick={() => dispatch({ type: 'TOGGLE_TASK', payload: task.id })}>
        Toggle
      </button>
      <button onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.id })}>
        Delete
      </button>
    </li>
  );
}
