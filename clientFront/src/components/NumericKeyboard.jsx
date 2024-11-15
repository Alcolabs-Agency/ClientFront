import React from "react";
import styles from "./NumericKeyboard.module.css";

function NumericKeyboard({ onKeyPress }) {
  const keys = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "Clear",
    "Enter",
  ];

  return (
    <div className={styles.keyboard}>
      {keys.map((key) => (
        <button
          key={key}
          onClick={() => onKeyPress(key)}
          className={styles.key}
        >
          {key}
        </button>
      ))}
    </div>
  );
}

export default NumericKeyboard;
