import styles from "./MenuDes.module.css"; // Importamos los estilos
import "@fortawesome/fontawesome-free/css/all.min.css";

const Menu = () => {
  return (
    <div className={styles.menucontainer}>
      <div className={styles.menutrigger}>
        {" "}
        <i className="fas fa-bars"></i>
      </div>
      <div className={styles.menucontent}>
        <ul>
          <li>Home</li>
          <li>Nuevo Producto</li>
          <li>Inventario</li>
          <li>Smart Inventory</li>
          <li>Categories</li>
          <li>Settings</li>
          <li>Registro Facturas</li>
          <li>Administrar dispositivos</li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
