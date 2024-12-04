import styles from "./SearchBar.module.css";
import React, { useState } from "react";
export default function SearchBar({ value, onChange }) {
  const [isInputVisible, setInputVisible] = useState(false);

  const handleToggleInput = () => {
    setInputVisible(!isInputVisible);
  };

  return (
    <div className={styles.container}>
      <div>
        <h3>Filtros</h3>
      </div>
      <div className={styles.containerButtons}>
        <button>+</button>
        <button onClick={handleToggleInput}>🔍</button>
        <input
          type="text"
          placeholder="Buscar producto..."
          value={value}
          onChange={onChange}
          className={isInputVisible ? styles.inputVisible : styles.inputHidden}
        />
      </div>
    </div>
  );
}
