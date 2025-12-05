// src/components/TaskForm.jsx
import React from 'react';
import { useDispatch } from 'react-redux';

export default function TaskForm() {
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    const titulo = e.target.titulo.value;
    if (!titulo) return;
    dispatch({
      type: 'ADD_TASK',
      payload: { id: Date.now(), titulo, completada: false }
    });
    e.target.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="titulo" placeholder="Nueva tarea" />
      <button type="submit">Agregar</button>
    </form>
  );
}
