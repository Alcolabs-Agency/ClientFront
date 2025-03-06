import styles from "./MenuDes.module.css"; // Importamos los estilos
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className={styles.menucontainer}>
      <div className={styles.menutrigger}>
        {" "}
        <i className="fas fa-bars"></i>
      </div>
      <div className={styles.menucontent}>
        <ul>
          <Link to="/" className={styles.links}>
            <li>Home</li>
          </Link>
          <Link to="createProduct" className={styles.links}>
            <li>Nuevo Producto</li>
          </Link>
          <Link to="/inventario" className={styles.links}>
            <li>Inventario</li>
          </Link>
          <Link to="/" className={styles.links}>
            <li>Smart Inventory</li>
          </Link>
          <Link to="/" className={styles.links}>
            <li>Categories</li>
          </Link>
          <Link to="/" className={styles.links}>
            <li>Settings</li>
          </Link>
          <Link to="/" className={styles.links}>
            <li>Registro Facturas</li>
          </Link>
          <Link to="/" className={styles.links}>
            <li>Administrar dispositivos</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
