import { Link } from "react-router-dom";
import styles from "./CreateProduct.module.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { useState } from "react";
export default function CreateProduct() {

  const [formData, setFormData] = useState({
    name: "",
    type: "Producto físico",
    description: "",
    unitPrice: "",
    weight: "",
    price: "",
    quantity: "",
    alert: "",
    sku: "",
    variants: { color: "", size: "" },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear el payload con la categoría "2"
    const payload = {
      data:{
      ...formData,
      category: "2", // Sobrescribimos
      }
    };
    try {
      const response = await fetch("http://localhost:4000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNzM4NzE1NzgxLCJleHAiOjE3NDEzMDc3ODF9.va7BjfrYzfNi8h2k2WVRN_VGg19cdyLJbvw09B512mE"
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Error al enviar los datos");
      }

      const result = await response.json();
      console.log(result);
      alert("Producto creado con éxito: " + JSON.stringify(result));
    } catch (error) {
      console.error(error);
      alert("Error al crear el producto");
    } 
  };
  return (
    <form className={styles.mainContainer} onSubmit={handleSubmit}>
      <div className={styles.containerbuttons}>
        <Link to={"/"} className={styles.links}>
          <i className="fas fa-arrow-left"></i>
        </Link>
        <button type="submit">Save</button>
      </div>
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
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.row}>
              <label className={styles.label}>Tipo de artículo</label>
              <select 
                className={styles.select}
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
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
              name="description"
              value={formData.description}
              onChange={handleChange}
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
                name="unitPrice"
                value={formData.unitPrice}
                onChange={handleChange}
              />
            </div>
            <div className={styles.row}>
              <input 
                type="text" 
                className={styles.input} 
                placeholder="Peso" 
                name="weight"
                value={formData.weight}
                onChange={handleChange}
              />
              <input
                type="text"
                className={styles.input}
                placeholder="Precio (requerido)"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
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
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
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
                name="alert"
                value={formData.alert}
                onChange={handleChange}
              />
            </div>
            <div className={styles.sectionpont}>
              <label className={styles.label}>SKU</label>
              <input 
                type="text" 
                className={styles.input} 
                placeholder="SKU" 
                name="sku"
                value={formData.sku}
                onChange={handleChange}
              />
            </div>
          </div>
          <p className={styles.sectionTitle}>Variantes</p>
          <div className={styles.variantsContainer}>
            <div className={styles.variantItem}>
              <input
                type="text"
                className={styles.input}
                placeholder="Colores"
                name="colors"
                value={formData.variants.colors}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    variants: { ...prev.variants, colors: e.target.value },
                  }))
                }
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
                name="size"
                value={formData.variants.size}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    variants: { ...prev.variants, size: e.target.value },
                  }))
                }
              />
              <span className={styles.addVariantText}>
                Agregar más variantes
              </span>
            </div>
            <button className={styles.addIconButton} type="button">+</button>
          </div>
        </div>
      </div>
    </form>
  );
}
