import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateOrder.module.css"; // Usa tus estilos

interface OrderLine {
  description: string;
  quantity: string;
  price: string;
}

const CreateOrder: React.FC = () => {
  const navigate = useNavigate();

  // Estados para los campos principales de la orden
  const [fecha, setFecha] = useState<string>(new Date().toISOString().slice(0, 10));
  const [proveedor, setProveedor] = useState<string>("");
  const [estado, setEstado] = useState<string>("Pendiente");

  // Manejar líneas de la orden
  const [lines, setLines] = useState<OrderLine[]>([]);

  // Ejemplo de agregar una línea vacía
  const handleAddLine = () => {
    setLines((prev) => [
      ...prev,
      { description: "", quantity: "", price: "" },
    ]);
  };

  // Manejar cambio de un campo de línea (índice + campo)
  const handleLineChange = (index: number, field: keyof OrderLine, value: string) => {
    const updated = [...lines];
    updated[index] = { ...updated[index], [field]: value };
    setLines(updated);
  };

  // Borrar línea
  const handleRemoveLine = (index: number) => {
    const updated = [...lines];
    updated.splice(index, 1);
    setLines(updated);
  };

  // Guardar la nueva orden
  const handleSaveOrder = async () => {
    try {
      // Cálculo de total
      const total = lines.reduce((acc, line) => {
        const priceNum = parseFloat(line.price.replace(/[^\d.]/g, "")) || 0;
        return acc + priceNum;
      }, 0);

      // Estructura del body para mandar al backend
      const body = {
        fecha,
        proveedor: proveedor || "Proveedor Desconocido",
        total,
        estado,
        lineas: lines,
      };

      // POST al backend (puedes crear un endpoint distinto, o reusar `archive-invoice` si lo deseas)
      const response = await fetch("/archive-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Error al crear la nueva orden");
      }

      // Si todo OK, navega a PurchaseOrders
      navigate("/purchaseOrders");
    } catch (err) {
      console.error("Error creando la orden:", err);
      alert("Error al crear la nueva orden");
    }
  };

  const handleCancel = () => {
    navigate("/purchaseOrders");
  };


  // Botón "Volver atrás" => retrocede 1 paso en el historial
  const handleGoBack = () => {
    navigate(-1);
  };

  // Botón "Volver a /smartInventory"
  const handleGoToSmartInventory = () => {
    navigate("/smartInventory");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Crear Nueva Orden</h2>

      <div className={styles.formGroup}>
        <label htmlFor="fecha">Fecha:</label>
        <input
          type="date"
          id="fecha"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="proveedor">Proveedor:</label>
        <input
          type="text"
          id="proveedor"
          value={proveedor}
          onChange={(e) => setProveedor(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="estado">Estado:</label>
        <select
          id="estado"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
        >
          <option value="Pendiente">Pendiente</option>
          <option value="Archivada">Archivada</option>
          <option value="En Proceso">En Proceso</option>
        </select>
      </div>

      <h3>Líneas de la Orden</h3>
      <table className={styles.tableLines}>
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {lines.map((line, idx) => (
            <tr key={idx}>
              <td>
                <input
                  type="text"
                  value={line.description}
                  onChange={(e) => handleLineChange(idx, "description", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={line.quantity}
                  onChange={(e) => handleLineChange(idx, "quantity", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={line.price}
                  onChange={(e) => handleLineChange(idx, "price", e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => handleRemoveLine(idx)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddLine}>Agregar Línea</button>

      <div className={styles.buttonsContainer}>
        <button className={styles.saveBtn} onClick={handleSaveOrder}>
          Guardar Orden
        </button>
        <button className={styles.cancelBtn} onClick={handleCancel}>
          Cancelar
        </button>
        <button className={styles.goBackBtn} onClick={handleGoBack}>
          Volver atrás
        </button>
        <button className={styles.goSmartBtn} onClick={handleGoToSmartInventory}>
          Ir a SmartInventory
        </button>
      </div>
    </div>
  );
};

export default CreateOrder;
