// OrderDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./OrderDetail.module.css";

interface OrderLine {
  description: string;
  quantity: string;
  price: string;
}

interface Order {
  id: string;
  fecha: string;
  proveedor: string;
  total: number;   
  estado: string;
  acciones?: string[];
  lineas: OrderLine[];
}

const OrderDetail: React.FC = () => {
  const { id } = useParams();  
  const navigate = useNavigate();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    fetch("/get-orders")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar órdenes");
        return res.json();
      })
      .then((allOrders: Order[]) => {
        const found = allOrders.find((o) => o.id === id);
        if (!found) {
          throw new Error("No se encontró la orden con ID " + id);
        }
        setOrder(found);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Cargando detalle de la orden...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  if (!order) {
    return <p>No se encontró la orden solicitada.</p>;
  }

  return (
    <div className={styles.container}>
      <h2>Detalle de la Orden</h2>

      <div className={styles.infoHeader}>
        <p><strong>Tipo de documento:</strong> Factura</p>
        <p><strong>Número de documento:</strong> {order.id}</p>
      </div>

      <div className={styles.basicInfo}>
        <p><strong>Fecha:</strong> {order.fecha}</p>
        <p><strong>Proveedor:</strong> {order.proveedor}</p>
        <p><strong>Estado:</strong> {order.estado}</p>
        <p><strong>Total:</strong> { (order.total ?? 0).toFixed(2) }</p>
      </div>
      <table className={styles.tableLines}>
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {order.lineas.map((line, idx) => (
            <tr key={idx}>
              <td>{line.description}</td>
              <td>{line.quantity}</td>
              <td>{line.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => navigate("/purchaseOrders")}>Volver</button>
    </div>
  );
};

export default OrderDetail;
