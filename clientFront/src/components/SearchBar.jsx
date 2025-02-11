/* eslint-disable react/prop-types */
// filepath: /home/yesenia/Documentos/ClientFront/clientFront/src/components/SearchBar.jsx
import styles from "./SearchBar.module.css";
import { useState } from "react";

export default function SearchBar({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleInput = () => {
    setIsOpen((prevState) => !prevState); // Alterna entre abierto y cerrado
  };
  return (
    <div className={styles.container}>
      <div>
        <h3>Filtros</h3>
      </div>
      <div className={styles.containerButtons}>
        <button>+</button>
        <button onClick={handleToggleInput}>🔍</button>
        {isOpen && (
          <input
            type="text"
            placeholder="Buscar producto..."
            value={value}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  );
}