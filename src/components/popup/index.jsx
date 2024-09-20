// TodoPopup.js
"use client"; // Adicione isso no topo
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const TodoPopup = ({ open, onClose, onConfirm, title, placeholder, value, onChange }) => {
  return (
    <Popup open={open} onClose={onClose}>
      <form onSubmit={(e) => { e.preventDefault(); onConfirm(); }}>
        <h2>{title}</h2>
        {placeholder && (
          <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            style={{ padding: '10px', width: '80%' }}
          />
        )}
        <button type="submit" style={{ padding: '10px' }}>
          Confirmar
        </button>
        <button type="button" onClick={onClose}>
          Cancelar
        </button>
      </form>
    </Popup>
  );
};

export default TodoPopup;
