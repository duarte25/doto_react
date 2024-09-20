"use client"; // Adicione isso no topo
import Styles from "./styles.module.scss";
import React, { useState, useEffect } from 'react';
import TodoItem from '../tasks';
import TodoPopup from '../popup'; // Importando o novo componente

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos && Array.isArray(storedTodos)) {
      setTodos(storedTodos);
    }
  }, []);

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
    <div className={Styles.container} >

      {/* Popup para adicionar tarefa */}
      <TodoPopup
        open={isAdding}
        onClose={() => setIsAdding(false)}
        onConfirm={confirmAddTodo}
        title="Nova trefa"
        placeholder="Digite"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
      />

      <div className={Styles.tasks}>
        <h3>Suas tarefas de hoje</h3>
        {todos.filter(todo => !todo.completed).map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            deleteTodo={() => setTodoToDelete(todo.id)}
          />
        ))}
        <h3>Tarefas finalizadas</h3>
        {todos.filter(todo => todo.completed).map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            deleteTodo={() => setTodoToDelete(todo.id)}
          />
        ))}
      </div>

      <button className={Styles.buttonAdd} onClick={() => setIsAdding(true)}>
        Adicionar Tarefa
      </button>

      {/* Popup para confirmar a deleção */}
      <TodoPopup
        open={todoToDelete !== null}
        onClose={() => setTodoToDelete(null)}
        onConfirm={() => confirmDeleteTodo(todoToDelete)}
        title="Confirmar Deleção"
        placeholder={null} // Não precisa de placeholder aqui
      >
        <p>Você tem certeza que deseja deletar esta tarefa?</p>
      </TodoPopup>

    </div>
  );
};

export default TodoList;
