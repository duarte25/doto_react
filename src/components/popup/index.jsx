"use client"; 
import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Styles from "./styles.module.scss";

const TodoPopup = ({ open, onClose, onConfirm, title, label, placeholder, value, onChange, buttonClass, labelClassName, buttonTitleConfirm }) => {
  const [popupWidth, setPopupWidth] = useState("26rem");
  const [popupHeight, setPopupHeight] = useState("auto");
  const [popupBorder, setPopupBorder] = useState("16px");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 450) {
        setPopupWidth("100%");
        setPopupHeight("100%");
        setPopupBorder("0")
      } else {
        setPopupWidth("26rem");
        setPopupHeight("auto")
        setPopupBorder("16px")
      }
    };

    handleResize(); 
    window.addEventListener('resize', handleResize); 

    return () => {
      window.removeEventListener('resize', handleResize); 
    };
  }, []);

  const contentStyle = { 
    width: popupWidth,
    height: popupHeight, 
    boxShadow: "0px 24px 48px -12px rgba(16, 24, 40, 0.18)",
    padding: "1rem",
    borderRadius: popupBorder
  };

  return (
    <Popup contentStyle={contentStyle} open={open} onClose={onClose}>
      <form className={Styles.popupForm} onSubmit={(e) => { e.preventDefault(); onConfirm(); }}>
        <h2>{title}</h2>
        <div className={Styles.inputDigit}>
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
