//import { products } from "../data";
import React from "react";
import ProductCard from "./ProductCard";
import styles from "./ProductList.module.css";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

const fetchProducts = async(setProducts, setError, setLoading) => {
  try {
    const response = await fetch('http://localhost:4000/api/products',{
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNzM4NzE1NzgxLCJleHAiOjE3NDEzMDc3ODF9.va7BjfrYzfNi8h2k2WVRN_VGg19cdyLJbvw09B512mE"
    },
    }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    setProducts(data.data)
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts(setProducts, setError, setLoading);
  }, []);

  return { products, loading, error };
};

export default function ProductList({ addToBag }) {
  const {products} = useProducts()
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
              key={product.documentId}
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
