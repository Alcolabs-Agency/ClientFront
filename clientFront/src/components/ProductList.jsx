import ProductCard from "./ProductCard";
import styles from "./ProductList.module.css";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const fetchProducts = async(setProducts, setError, setLoading) => {
  try {
    const response = await fetch('https://express-app-dep.onrender.com/api/products',{
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQwMDAyNTU1LCJleHAiOjE3NDI1OTQ1NTV9.o33Izh2SHogoF_TtvFZ16s-QHEWTNk9KbdG4iEpRFx8"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    setProducts(data.data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

ProductList.propTypes = {
  addToBag: PropTypes.func.isRequired,
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
  const { products, loading, error } = useProducts();
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
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : filteredProducts.length > 0 ? (
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
