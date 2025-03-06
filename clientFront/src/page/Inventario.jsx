import styles from "./Inventario.module.css";
import { useState, useEffect } from "react";
import { FaSearch, FaFilter, FaPlus, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const fetchProducts = async (
  setProducts,
  setError,
  setLoading,
  categoryId = null
) => {
  try {
    let url = "https://express-app-dep.onrender.com/api/products";
    if (categoryId) {
      url += `?category=${categoryId}`;
    }
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQwMDAyNTU1LCJleHAiOjE3NDI1OTQ1NTV9.o33Izh2SHogoF_TtvFZ16s-QHEWTNk9KbdG4iEpRFx8",
      },
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

const fetchCategories = async (setCategories, setError) => {
  try {
    const response = await fetch(
      "https://express-app-dep.onrender.com/api/categories",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQwMDAyNTU1LCJleHAiOjE3NDI1OTQ1NTV9.o33Izh2SHogoF_TtvFZ16s-QHEWTNk9KbdG4iEpRFx8",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    setCategories(data);
  } catch (err) {
    setError(err.message);
  }
};

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories(setCategories, setError);
  }, []);

  return { categories, error };
};

const useProducts = (categoryId) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("productos");
    fetchProducts(setProducts, setError, setLoading, categoryId);
  }, [categoryId]);

  return { products, loading, error };
};

export default function Inventario() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { categories } = useCategories();
  const { products, loading, error } = useProducts(selectedCategory);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleEdit = (documentId) => {
    console.log(`Editando artículo con ID: ${documentId}`);
  };

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}></div>

      <div className={styles.inventoryHeader}>
        <div className={styles.optionsContainer}>
          <select className={styles.select} onChange={handleCategoryChange}>
            <option>Categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <select className={styles.select}>
            <option>Estado</option>
            <option>Activo</option>
            <option>Inactivo</option>
          </select>
          <button className={styles.filterButton}>
            <FaFilter /> Todos los filtros
          </button>

          {isSearchVisible ? (
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Buscar..."
              onBlur={() => setIsSearchVisible(false)}
            />
          ) : (
            <button className={styles.iconButton} onClick={toggleSearch}>
              <FaSearch />
            </button>
          )}

          <button className={styles.iconButton}>
            <FaPlus />
          </button>
          <Link to="/createProduct" className={styles.createButton}>
            Crear producto
          </Link>
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th></th>
            <th>Artículo</th>
            <th>Categoría</th>
            <th>Existencia</th>
            <th>Precio</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item.documentId}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{item.name}</td>
              <td>{item.category.name}</td>
              <td>{item.stock}</td>
              <td>${item.price}</td>
              <td>
                <FaEdit
                  className={styles.editIcon}
                  onClick={() => handleEdit(item.documentId)}
                  title="Editar artículo"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
