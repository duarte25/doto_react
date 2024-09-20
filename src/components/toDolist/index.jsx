"use client"; // Adicione isso no topo
import Styles from "./styles.module.scss";
import React, { useState, useEffect } from 'react';
import TodoItem from '../tasks';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  // Carregar tarefas do localStorage quando o componente é montado
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos && Array.isArray(storedTodos)) {
      setTodos(storedTodos);
    }
  }, []);

  // Atualizar o localStorage sempre que os `todos` mudarem
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  const confirmAddTodo = () => {
    if (todoText.trim()) {
      const newTodo = { id: Date.now(), text: todoText, completed: false };
      setTodos([...todos, newTodo]);
      setTodoText('');
    }
    setIsAdding(false);
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const confirmDeleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    setTodoToDelete(null);
  };

  return (
    <div className={Styles.container}
     style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>

      {/* Popup para adicionar tarefa */}
      {/* esse popup no futuro deve ser um componente */}
      <Popup open={isAdding} onClose={() => setIsAdding(false)}>
        <form onSubmit={(e) => { e.preventDefault(); confirmAddTodo(); }}>
          <h2>Adicionar Tarefa</h2>
          <input
            type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            placeholder="Nova tarefa"
            style={{ padding: '10px', width: '80%' }}
          />
          <button type="submit" style={{ padding: '10px' }}>Adicionar</button>
          <button onClick={() => setIsAdding(false)}>Cancelar</button>
        </form>
      </Popup>

      <div className={Styles.tasks}>
        <h3>Suas tarefas de hoje</h3>
        {todos.filter(todo => !todo.completed).map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            deleteTodo={() => setTodoToDelete(todo.id)} // Abre o popup para deletar
          />

        ))}
        <h3>Tarefas finalizadas</h3>
        {todos.filter(todo => todo.completed).map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            deleteTodo={() => setTodoToDelete(todo.id)} // Abre o popup para deletar
          />
        ))}
      </div>

      <button className={Styles.buttonAdd} onClick={() => setIsAdding(true)}>
        Adicionar Tarefa
      </button>


      {/* Popup para confirmar a deleção */}
      <Popup open={todoToDelete !== null} onClose={() => setTodoToDelete(null)}>
        <div>
          <h2>Confirmar Deleção</h2>
          <p>Você tem certeza que deseja deletar esta tarefa?</p>
          <button onClick={() => confirmDeleteTodo(todoToDelete)}>Sim</button>
          <button onClick={() => setTodoToDelete(null)}>Cancelar</button>
        </div>
      </Popup>

    </div>
  );
};

export default TodoList;
