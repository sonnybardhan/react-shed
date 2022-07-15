import React, { useState } from 'react';

export const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!todo) return;

    const newTodo = {
      task: todo,
      id: Math.random() * 999,
      complete: false,
    };
    setTodos([...todos, newTodo]);
    setTodo('');
  };

  const handleDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      })
    );
  };

  return (
    <div>
      <div className='container'>
        <div className='input-container'>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
            <button onClick={handleSubmit}>Add</button>
          </form>
        </div>
        <div className='todos-container'>
          {todos.map((todo) => (
            <div
              key={Math.random() * 999}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                color: todo.complete ? 'green' : 'red',
                width: '100%',
                padding: '2px',
                margin: '2px',
              }}
            >
              <p
                onClick={() => handleComplete(todo.id)}
                style={{
                  width: '100%',
                  textDecoration: todo.complete && 'line-through',
                }}
              >
                {todo.task}
              </p>
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
