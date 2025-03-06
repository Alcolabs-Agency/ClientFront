import styles from "./ProductCard.module.css";
import React from "react";
const IMG = "https://images.unsplash.com/photo-1589647312696-ec8237db05f9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
export default function ProductCard({ product, addToBag }) {
  return (
    <div className={styles.containerGeneral} key={styles.documentId}>
      <div
        className={styles.containerimg}
        style={{
          backgroundImage: `url(${IMG})`,
        }}
      >
        <button onClick={() => addToBag(product)}></button>
      </div>
      <div className={styles.containerinfo}>
        <h3>{product.name}</h3>
        <p> $ {product.price}</p>
      </div>
    </div>
  );
}
