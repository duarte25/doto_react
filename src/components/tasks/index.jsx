// components/TodoItem.js
import React from 'react';
import Styles from './styles.module.scss';
import { FiTrash } from "react-icons/fi";

const TodoItem = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <div className={Styles.container} >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
      />
      <div
        className={Styles.task}
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        onClick={() => toggleComplete(todo.id)}
      >
        {todo.text}
      </div>
      <div className={Styles.button}>

          <FiTrash onClick={() => deleteTodo(todo.id)} className={Styles.iconTrash}/>

      </div>
    </div>
  );
};

export default TodoItem;
