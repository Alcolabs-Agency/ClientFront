import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import "@fortawesome/fontawesome-free/css/all.css";

export default function NavBar() {
  return (
    <div className={styles.containerNav}>
      <div className={styles.containerinnfo}>
        <div className={styles.logocontainer}>
          <button aria-label="Open menu">
            <i className="fas fa-bars"></i>
          </button>
          <h1>LOGO</h1>
        </div>
        <div className={styles.containerIcons}>
          <Link to="/" aria-label="Logout" className={styles.logoutbtn}>
            <i className="fas fa-home"></i>
          </Link>

          <Link to="/" aria-label="Logout" className={styles.logoutbtn}>
            <i className="fas fa-cart-arrow-down"></i>
          </Link>
          <Link to="/" aria-label="Logout" className={styles.logoutbtn}>
            <i className="fas fa-sign-out-alt"></i>
          </Link>
        </div>
        <div className={styles.containerPerfil}>
          <p>Eduardo</p>
          {/*name*/}
          <img
            src="https://media.istockphoto.com/id/1344327532/es/foto/retrato-de-estudio-de-una-atractiva-mujer-de-19-a%C3%B1os-con-cabello-casta%C3%B1o.jpg?s=2048x2048&w=is&k=20&c=WbxxRzb0OvehZfSxrpl4iK56n0iL20hlKdDq3G3QXCY="
            alt=""
            width="40px"
            height="40px"
          />
          <button aria-label="Arrow Down" className={styles.logoutbtn}>
            <i className="fas fa-caret-down"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
