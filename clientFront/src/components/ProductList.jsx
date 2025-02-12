//import { products } from "../data";
import React from "react";
import ProductCard from "./ProductCard";
import styles from "./ProductList.module.css";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

const fetchProducts = async(setProducts, setError, setLoading) => {
  try {
    const response = await fetch('https://express-app-dep.onrender.com/api/products',{
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM5MzEyNDU1LCJleHAiOjE3NDE5MDQ0NTV9.edz5Tms5sgFHD2u_hxZ4GqO1fD7U6_v_o2mvuFakqno"
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
