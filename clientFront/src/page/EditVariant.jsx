import { FaTimes } from "react-icons/fa";
import styles from "./EditVariant.module.css";

export default function EditVariant() {
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.header}>
          <h4 className={styles.title}>Editar variante</h4>
          <button className={styles.saveButton}>Guardar</button>
        </div>

        <div className={styles.mainContainer}>
          <div className={styles.leftColumn}>
            <div className={styles.infoSection}>
              <h2 className={styles.sectionTitle}>Info.</h2>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Tipo de artículo</label>
                <div className={styles.inputRow}>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Producto físico"
                    disabled
                  />
                  <button className={styles.changeButton}>Cambiar</button>
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Nombre (requerido)</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Nombre del producto"
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Descripción</label>
                <textarea
                  className={styles.textarea}
                  placeholder="Descripción del producto"
                ></textarea>
              </div>
              <div className={styles.imageUpload}>
                <label className={styles.label}>Imagen del producto</label>
                <div className={styles.imageBox}>
                  <span>
                    Arrastra y suelta las imágenes aquí, o cárgalas desde la
                    biblioteca.
                  </span>
                </div>
                <button className={styles.editButton}>Editar</button>
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Ubicaciones</label>
                <select className={styles.select}>
                  <option>Ferretería Central</option>
                </select>
              </div>
              <div className={styles.categorySection}>
                <h2 className={styles.sectionTitle}>Categorización</h2>
                <div className={styles.categoryOptions}>
                  <label>
                    <input type="checkbox" />
                    Crear Categoría
                  </label>
                  <label>
                    <input type="checkbox" />
                    Madera
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.unitSection}>
              <h2 className={styles.sectionTitle}>Unidades</h2>
              <p className={styles.infoText}>
                Agrega unidades adicionales para medir este artículo y llevar un
                seguimiento.
              </p>
              <div className={styles.inputRow}>
                <select className={styles.select}>
                  <option>Por artículo</option>
                </select>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Costo por unidad y proveedor"
                />
              </div>
              <div className={styles.inputRow}>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Peso"
                />
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Precio (requerido)"
                />
              </div>
            </div>

            <div className={styles.existenceSection}>
              <h2 className={styles.sectionTitle}>Existencia</h2>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Cantidad de inventario</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Cantidad"
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  Alertas de existencias bajas
                </label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Ninguno"
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>SKU</label>
                <input type="text" className={styles.input} placeholder="SKU" />
              </div>
            </div>

            <div className={styles.variantsSection}>
              <h2 className={styles.sectionTitle}>Selección de Variantes</h2>
              <div className={styles.variantOptions}>
                <label className={styles.variantLabel}>
                  <input type="checkbox" />
                  <span className={styles.variantText}>Color</span>
                </label>
                <div className={styles.subOptions}>
                  <label className={`${styles.colorOption} ${styles.red}`}>
                    <input type="checkbox" />
                    <span>Rojo</span>
                  </label>
                  <label className={`${styles.colorOption} ${styles.blue}`}>
                    <input type="checkbox" />
                    <span>Azul</span>
                  </label>
                </div>

                <label className={styles.variantLabel}>
                  <input type="checkbox" />
                  <span className={styles.variantText}>Tamaño</span>
                </label>

                <div className={styles.subOptions}>
                  <label>
                    <input type="checkbox" />
                    <span>X cosa</span>
                  </label>
                  <label>
                    <input type="checkbox" />
                    <span>X cosa</span>
                  </label>
                </div>

                <label className={styles.variantLabel}>
                  <input type="checkbox" />
                  <span className={styles.variantText}>X cosa</span>
                </label>

                <div className={styles.subOptions}>
                  <label>
                    <input type="checkbox" />
                    <span>X cosa</span>
                  </label>
                  <label>
                    <input type="checkbox" />
                    <span>X cosa</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
