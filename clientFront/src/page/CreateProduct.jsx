import styles from "./CreateProduct.module.css";

export default function CreateProduct() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.gridContainer}>
        <div className={styles.column1}>
          <p className={styles.sectionTitle}>Info.</p>
          <div className={styles.columnsection}>
            <div>
              <label className={styles.label}>Nombre (requerido)</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Nombre del producto"
              />
            </div>
            <div className={styles.row}>
              <label className={styles.label}>Tipo de artículo</label>
              <select className={styles.select}>
                <option>Producto físico</option>
              </select>
              <button className={styles.changeButton}>Cambio</button>
            </div>
          </div>
          <div>
            <label className={styles.label}>Descripción</label>
            <textarea
              className={styles.textarea}
              rows="3"
              placeholder="Descripción del producto"
            ></textarea>
          </div>
          <div className={styles.imageUpload}>
            <div className={styles.imageBox}>
              <label className={styles.label}>Imagen del producto</label>
              <span>Arrastra y suelta las imágenes aquí</span>
              <button className={styles.editButton}>Editar</button>
            </div>
            <div>
              <label className={styles.label}>Ubicaciones</label>
              <select className={styles.select}>
                <option>Ferretería Central</option>
              </select>
            </div>
          </div>

          <p className={styles.sectionTitle}>Categorización</p>
          <div className={styles.categoryContainer}>
            <div className={styles.categoryItem}>
              <input type="checkbox" />
              <label className={styles.categoryLabel}>Crear Categoría</label>
              <button className={styles.selectButton}>Seleccionar</button>
            </div>
            <div className={styles.categoryItem}>
              <input type="checkbox" />
              <label className={styles.categoryLabel}>Madera</label>
              <button className={styles.selectButton}>Seleccionar</button>
            </div>
          </div>
        </div>

        <div className={styles.column2}>
          <p className={styles.sectionTitle}>Unidades</p>
          <p className={styles.infoText}>
            Agrega unidades adicionales para medir este artículo y llevar un
            seguimiento.
          </p>
          <div className={styles.colum2section}>
            <div className={styles.row}>
              <select className={styles.select}>
                <option>Por artículo</option>
              </select>
              <input
                type="text"
                className={styles.input}
                placeholder="Costo por unidad"
              />
            </div>
            <div className={styles.row}>
              <input type="text" className={styles.input} placeholder="Peso" />
              <input
                type="text"
                className={styles.input}
                placeholder="Precio (requerido)"
              />
            </div>
          </div>

          <p className={styles.sectionTitle}>Existencia</p>
          <div className={styles.exitenciasection}>
            <div className={styles.sectionpont}>
              <label className={styles.label}>Cantidad de inventario</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Cantidad"
              />
            </div>
            <div className={styles.sectionpont}>
              <label className={styles.label}>
                Alertas de existencias bajas
              </label>
              <input
                type="text"
                className={styles.input}
                placeholder="Ninguno"
              />
            </div>
            <div className={styles.sectionpont}>
              <label className={styles.label}>SKU</label>
              <input type="text" className={styles.input} placeholder="SKU" />
            </div>
          </div>
          <p className={styles.sectionTitle}>Variantes</p>
          <div className={styles.variantsContainer}>
            <div className={styles.variantItem}>
              <input
                type="text"
                className={styles.input}
                placeholder="Colores"
              />
              <span className={styles.addVariantText}>
                Agregar más variantes
              </span>
            </div>

            <div className={styles.variantItem}>
              <input
                type="text"
                className={styles.input}
                placeholder="Tamaño"
              />
              <span className={styles.addVariantText}>
                Agregar más variantes
              </span>
            </div>
            <button className={styles.addIconButton}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
}
