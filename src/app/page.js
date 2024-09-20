// pages/index.js
"use client"
import React from 'react';
import TodoList from '../components/toDolist';

export default function Home() {
  return (
    <div>
      <TodoList />
    </div>
  );
}