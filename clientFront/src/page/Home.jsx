import ProductList from "../components/ProductList";
import ShoppingBag from "../components/ShoppingBag";
import NavBar from "../components/NavBar";

import { useState } from "react";
import styles from "./Home.module.css";

export default function Home() {
  const [bagItems, setBagItems] = useState([]);

  const updateQuantity = (id, newQuantity) => {
    setBagItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const addToBag = (product) => {
    setBagItems((prevItems) => {
      const productInBag = prevItems.find((item) => item.id === product.id);

      if (productInBag) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };
  return (
    <div className={styles.container}>
      <ProductList addToBag={addToBag} />
      <ShoppingBag bagItems={bagItems} updateQuantity={updateQuantity} />
    </div>
  );
}
