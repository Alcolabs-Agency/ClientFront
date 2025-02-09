import styles from "./Inventario.module.css";
import { useState } from "react";
import {
  FaArrowLeft,
  FaSearch,
  FaFilter,
  FaPlus,
  FaEdit,
} from "react-icons/fa";

export default function Inventario() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleEdit = (id) => {
    console.log(`Editando artículo con ID: ${id}`);
  };

  // Datos simulados para la tabla de inventario
  const inventoryData = [
    {
      id: 1,
      articulo: "Tenazas D'Orite STV 10\" 254MM BI-502",
      categoria: "Herramientas",
      existencia: "96.50/unidad",
      precio: "$8.50",
    },
    {
      id: 2,
      articulo: "Martillo Acero Profesional 16oz",
      categoria: "Herramientas",
      existencia: "124/unidad",
      precio: "$12.00",
    },
    {
      id: 3,
      articulo: 'Destornillador Philips 5" Mango Erg.',
      categoria: "Herramientas",
      existencia: "50/unidad",
      precio: "$5.00",
    },
    {
      id: 4,
      articulo: 'Serrucho Profesional 14" con Mango',
      categoria: "Herramientas",
      existencia: "78/unidad",
      precio: "$15.30",
    },
    {
      id: 5,
      articulo: "Cinta Métrica 3m Reforzada",
      categoria: "Herramientas",
      existencia: "210/unidad",
      precio: "$3.20",
    },
    {
      id: 6,
      articulo: 'Llave Inglesa 8" Ajustable',
      categoria: "Herramientas",
      existencia: "95/unidad",
      precio: "$9.80",
    },
    {
      id: 7,
      articulo: "Juego de Llaves Allen 10pzas",
      categoria: "Herramientas",
      existencia: "65/unidad",
      precio: "$6.50",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}></div>

      <div className={styles.inventoryHeader}>
        <div className={styles.optionsContainer}>
          <select className={styles.select}>
            <option>Categoría</option>
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
          <button className={styles.createButton}>Crear artículo</button>
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Artículo</th>
            <th>Categoría</th>
            <th>Existencia</th>
            <th>Precio</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {inventoryData.map((item) => (
            <tr key={item.id}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{item.articulo}</td>
              <td>{item.categoria}</td>
              <td>{item.existencia}</td>
              <td>{item.precio}</td>
              <td>
                <FaEdit
                  className={styles.editIcon}
                  onClick={() => handleEdit(item.id)}
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
