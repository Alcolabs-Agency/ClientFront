import { products } from "../data";
import React from "react";
import ProductCard from "./ProductCard";
import styles from "./ProductList.module.css";
import { useState } from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

export default function ProductList({ addToBag }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.Search}>
        <Link to="createProduct" className={styles.LinkStyle}>
          + ADD NEW ITEM
        </Link>
        <SearchBar value={searchTerm} onChange={handleSearchChange} />
      </div>

      <div className={styles.ContainerList}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToBag={addToBag}
            />
          ))
        ) : (
          <p>No se encontraron productos :</p>
        )}
      </div>
    </div>
  );
}
