import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import styles from "./PurchaseOrders.module.css"; 

interface Order {
  id: string;
  fecha: string;
  proveedor: string;
  total: number;
  estado: string;
  acciones?: string[];
}

const PurchaseOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();



  useEffect(() => {
    fetch("/get-orders", { credentials: "include" })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al cargar órdenes de compra");
        }
        return res.json();
      })
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleVolver = () => {
    navigate("/smartInventory");
  };


  const handleNuevaOrden = () => {
    navigate("/createOrder"); 
  };
  const handleProveedores = () => {
    window.location.href = "/providers";
  };

  if (loading) {
    return <p className={styles.loading}>Cargando órdenes...</p>;
  }

  if (error) {
    return <p className={styles.error}>Error: {error}</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Gestor de Órdenes de Compra</h2>
        {/* Aquí coloqare un icono de react */}
      </div>

      <div className={styles.tabButtons}>
        <button className={styles.btnTabActive}>Órdenes de Compra</button>
        <button className={styles.btnTab} onClick={handleNuevaOrden}>Nueva Orden</button>
        <button className={styles.btnTab} onClick={handleProveedores}>Proveedores</button>
      </div>
      <table className={styles.tableOrders}>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Proveedor</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.fecha}</td>
              <td>{order.proveedor}</td>
              <td>{(order.total ?? 0).toFixed(2)}</td>
              <td>{order.estado}</td>
              <td className={styles.actionsCell}>
              {order.acciones?.map((accion, idx) => {
                  if (accion === "Ver Factura") {
                    return (
                      <Link
                        key={idx}
                        to={`/purchaseOrders/${order.id}`}
                        className={styles.btnAccion}
                      >
                        Ver Factura
                      </Link>
                    );
                  } else {
                    return (
                      <button key={idx} className={styles.btnAccion}>
                        {accion}
                      </button>
                    );
                  }
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className={styles.btnVolver} onClick={handleVolver}>
        Volver
      </button>
    </div>
  );
};

export default PurchaseOrders;
