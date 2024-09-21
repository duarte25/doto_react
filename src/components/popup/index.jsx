// TodoPopup.js
"use client"; // Adicione isso no topo
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Styles from "./styles.module.scss";

const TodoPopup = ({ open, onClose, onConfirm, title, label, placeholder, value, onChange, buttonClass, labelClassName, buttonTitleConfirm }) => {

  const contentStyle = { width: "25%", height: "auto", boxShadow: "0px 24px 48px -12px rgba(16, 24, 40, 0.18)", borderRadius: "16px" }
  return (
    <Popup {...{ contentStyle }} open={open} onClose={onClose}>
      <form className={Styles.popupForm} onSubmit={(e) => { e.preventDefault(); onConfirm(); }}>
        <h2>{title}</h2>
        <div className={Styles.inputDigit} >
          <h3 className={labelClassName}>{label}</h3>
          {placeholder && (
            <input
              type="text"
              value={value}
              onChange={onChange}
              placeholder={placeholder}
            />
          )}
        </div>
        <div className={Styles.buttons}>
          <button className={Styles.buttonCancel} type="button" onClick={onClose}>
            Cancelar
          </button>
          <button className={`${Styles.buttonConfirm} ${buttonClass}`} type="submit">
            {buttonTitleConfirm}
          </button>
        </div>
      </form>
    </Popup>
  );
};

export default TodoPopup;
