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
        title="Nova tarefa"
        label="Título"
        placeholder="Digite"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        buttonClass={Styles.buttonClassBlue}
        buttonTitleConfirm={"Adicionar"}
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
        Adicionar nova tarefa
      </button>

      {/* Popup para confirmar a deleção */}
      <TodoPopup
        open={todoToDelete !== null}
        onClose={() => setTodoToDelete(null)}
        onConfirm={() => confirmDeleteTodo(todoToDelete)}
        title="Deletar tarefa"
        label="Tem certeza que você deseja deletar essa tarefa?"
        value={null}
        placeholder={null}
        buttonClass={Styles.buttonClassRed}
        labelClassName={Styles.labelClassName}
        buttonTitleConfirm={"Deletar"}
      >
      </TodoPopup>

    </div>
  );
};

export default TodoList;
