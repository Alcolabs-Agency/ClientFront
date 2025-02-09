import styles from "./SearchBar.module.css";
import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";

export default function SearchBar({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleInput = () => {
    setIsOpen((prevState) => !prevState); // Alterna entre abierto y cerrado
  };
  return (
    <div className={styles.container}>
      <button onClick={handleToggleInput} className={styles.toggleButton}>
        <i className="fas fa-search"></i>
      </button>
      {isOpen && (
        <input
          type="text"
          placeholder="Buscar producto..."
          value={value}
          onChange={onChange}
          className={styles.inputs}
        />
      )}
    </div>
  );
}
