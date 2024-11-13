import styles from "./CreateProduct.module.css";
import { FaArrowLeft } from "react-icons/fa";

export default function CreateProduct() {
  return (
    <div className={styles.container}>
      
      <img src="/Frame 65.png" alt="Logo" className={styles.logo} />

      
      <div className={styles.backButton}>
        <FaArrowLeft />
      </div>

      
      <button className={styles.saveButton}>Guardar</button>

      
      <div className={styles.mainContainer}>
        <div className={styles.gridContainer}>
         
          <div className={styles.column1}>
            <h2 className={styles.sectionTitle}>Info.</h2>
            <div>
              <label className={styles.label}>Tipo de artículo</label>
              <div className={styles.row}>
                <select className={styles.select}>
                  <option>Producto físico</option>
                </select>
                <button className={styles.changeButton}>Cambio</button>
              </div>
            </div>
            <div>
              <label className={styles.label}>Nombre (requerido)</label>
              <input type="text" className={styles.input} placeholder="Nombre del producto" />
            </div>
            <div>
              <label className={styles.label}>Descripción</label>
              <textarea className={styles.textarea} rows="3" placeholder="Descripción del producto"></textarea>
            </div>
            <div className={styles.imageUpload}>
              <label className={styles.label}>Imagen del producto</label>
              <div className={styles.imageBox}>
                <span>Arrastra y suelta las imágenes aquí, o cárgalas desde la biblioteca.</span>
              </div>
              <button className={styles.editButton}>Editar</button>
            </div>
            <div>
              <label className={styles.label}>Ubicaciones</label>
              <select className={styles.select}>
                <option>Ferretería Central</option>
              </select>
            </div>

           
            <h2 className={styles.sectionTitle}>Categorización</h2>
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
            <h2 className={styles.sectionTitle}>Unidades</h2>
            <p className={styles.infoText}>
              Agrega unidades adicionales para medir este artículo y llevar un seguimiento.
            </p>
            <div className={styles.row}>
              <select className={styles.select}>
                <option>Por artículo</option>
              </select>
              <input type="text" className={styles.input} placeholder="Costo por unidad" />
            </div>
            <div className={styles.row}>
              <input type="text" className={styles.input} placeholder="Peso" />
              <input type="text" className={styles.input} placeholder="Precio (requerido)" />
            </div>

            <h2 className={styles.sectionTitle}>Existencia</h2>
            <div>
              <label className={styles.label}>Cantidad de inventario</label>
              <input type="text" className={styles.input} placeholder="Cantidad" />
            </div>
            <div>
              <label className={styles.label}>Alertas de existencias bajas</label>
              <input type="text" className={styles.input} placeholder="Ninguno" />
            </div>
            <div>
              <label className={styles.label}>SKU</label>
              <input type="text" className={styles.input} placeholder="SKU" />
            </div>

            <h2 className={styles.sectionTitle}>Variantes</h2>
            <div className={styles.variantItem}>
              <input type="text" className={styles.input} placeholder="Colores" />
              <button className={styles.addVariantButton}>Agregar más variantes</button>
            </div>
            <div className={styles.variantItem}>
              <input type="text" className={styles.input} placeholder="Tamaño" />
              <button className={styles.addVariantButton}>Agregar más variantes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
