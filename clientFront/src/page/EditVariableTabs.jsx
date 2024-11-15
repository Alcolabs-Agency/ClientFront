import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import styles from "./EditVariableTabs.module.css";

export default function EditVariableTabs() {
  // Estado para la pestaña activa
  const [activeTab, setActiveTab] = useState("lista");
  const [isSaveEnabled, setIsSaveEnabled] = useState(true);

  // Manejar cambios en el input para habilitar 
  const handleInputChange = (event) => {
    setIsSaveEnabled(event.target.value.trim().length > 0);
  };

  // Función para renderizar contenido la pestaña activa
  const renderContent = () => {
    if (activeTab === "lista") {
      return (
        <>
          <div className={styles.inputGroup}>
          <button className={styles.addButton}>Agregar nuevo Item</button>
          <input
              type="text"
              placeholder="Agregar nueva Variable"
              className={styles.input}
              onChange={handleInputChange}
            />
        
            <div className={styles.variableList}>
              <div className={styles.variableItem}>Tamaño</div>
              <div className={styles.variableItem}>Color</div>
            </div>
          </div>
        </>
      );
    } else if (activeTab === "tamaño") {
      return (
        <>
          <div className={styles.inputGroup}>
            <button className={styles.addButton}>Agregar nuevo Item</button>
            <input
              type="text"
              placeholder="Agregar nueva Variable"
              className={styles.input}
              onChange={handleInputChange}
            />
            <div className={styles.variableList}>
              <div className={styles.variableItem}>1/2&quot; (13 mm) - 3/4&quot; (19 mm)</div>
              <div className={styles.variableItem}>1/2&quot; (13 mm) - 3/4&quot; (19 mm)</div>
            </div>
          </div>
        </>
      );
    } else if (activeTab === "color") {
      return (
        <>
          <div className={styles.inputGroup}>
            <button className={styles.addButton}>Agregar nuevo Item</button>
            <input
              type="text"
              placeholder="Agregar nueva Variable"
              className={styles.input}
              onChange={handleInputChange}
            />
            <div className={styles.variableList}>
              <div className={styles.variableItem}>Rojo</div>
              <div className={styles.variableItem}>Azul</div>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <div className={styles.container}>
      
      <div className={styles.header}>
        <button className={styles.closeButton}><FaTimes /></button>
        <h1 className={styles.title}>Editar variante</h1>
        <button className={styles.saveButton} disabled={!isSaveEnabled}>Guardar</button>
      </div>

     
      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${activeTab === "lista" ? styles.active : ""}`}
          onClick={() => setActiveTab("lista")}
        >
          Lista de Variables
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === "tamaño" ? styles.active : ""}`}
          onClick={() => setActiveTab("tamaño")}
        >
          Tamaño
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === "color" ? styles.active : ""}`}
          onClick={() => setActiveTab("color")}
        >
          Color
        </button>
      </div>

      <div className={styles.content}>{renderContent()}</div>
    </div>
  );
}
