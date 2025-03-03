import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Providers.module.css";

interface Provider {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
}

const Providers: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/get-providers", { credentials: "include" })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al cargar proveedores");
        }
        return res.json();
      })
      .then((data: Provider[]) => {
        setProviders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error en fetch /get-providers:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);
  
  const handleAddProvider = () => {
    navigate("/createProvider");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoToSmartInventory = () => {
    navigate("/smartInventory");
  };

  if (loading) {
    return <p className={styles.loading}>Cargando proveedores...</p>;
  }

  if (error) {
    return <p className={styles.error}>Error: {error}</p>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Proveedores</h2>
      
      <div className={styles.buttonsContainer}>
        <button className={styles.addBtn} onClick={handleAddProvider}>
          Agregar Proveedor
        </button>
      </div>

      <table className={styles.tableProviders}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Contacto</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {providers.map((provider) => (
            <tr key={provider.id}>
              <td>{provider.name}</td>
              <td>{provider.contact}</td>
              <td>{provider.phone}</td>
              <td>{provider.email}</td>
              <td>{provider.address}</td>
              <td>
                <Link to={`/providers/${provider.id}`} className={styles.actionBtn}>
                  Ver
                </Link>
                <button className={styles.actionBtn}>Editar</button>
                <button className={styles.actionBtn}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.buttonsContainer}>
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

export default Providers;
