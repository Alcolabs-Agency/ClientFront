import { products } from "../data";
import React from "react";
import ProductCard from "./ProductCard";
import styles from "./ProductList.module.css";
import { useState } from "react";
import SearchBar from "./SearchBar";

export default function ProductList() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <SearchBar value={searchTerm} onChange={handleSearchChange} />
      <div className={styles.ContainerList}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No se encontraron productos</p>
        )}
      </div>
    </div>
  );
}
