import styles from "./SearchBar.module.css";
import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";

export default function SearchBar({ value, onChange }) {
  const [isInputVisible, setInputVisible] = useState(false);

  const handleToggleInput = () => {
    setInputVisible(!isInputVisible);
  };

  return (
    <div className={styles.container}>
      <p aria-label="Filter" className={styles.Iconofilter}>
        <i className="fas fa-sliders-h"></i>
      </p>
      <input
        type="text"
        placeholder="Buscar producto..."
        value={value}
        onChange={onChange}
        className={styles.inputs}
      />
      <button onClick={handleToggleInput}>
        {" "}
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
}
