import styles from "./ProductCard.module.css";

export default function ProductCard({ product }) {
  return (
    <div className={styles.containerGeneral}>
      <img src={product.img} alt={product.name} />
      <h3>{product.name}</h3>
      <p> {product.price}</p>
    </div>
  );
}
