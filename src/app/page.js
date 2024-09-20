// pages/index.js
"use client"
import React from 'react';
import TodoList from '../components/toDolist';
import Styles from "./page.module.scss"

export default function Home() {
  return (
    <div>
      <TodoList className={Styles.todoList}/>
    </div>
  );
}