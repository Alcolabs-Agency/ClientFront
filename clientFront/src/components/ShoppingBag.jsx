import styles from "./ShoppingBag.module.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function ShoppingBag({ bagItems, updateQuantity }) {
  const totalPrice = bagItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className={styles.container}>
      {bagItems.length === 0 ? (
        <p></p>
      ) : (
        <div className={styles.products}>
          <h4>Checkout</h4>
          <div className={styles.especificacion}>
            <p>Name - QTY</p>
            <p>Price</p>
          </div>

          {bagItems.map((item, index) => (
            <div key={item.id} className={styles.items}>
              <div>
                <p key={index}>
                  <strong>{item.name} </strong>
                </p>
                <p>
                  $<strong> {item.price}</strong>
                </p>
              </div>
              <div className={styles.buttons}>
                <p>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                  / unidades
                </p>
                <p className={styles.ps}>
                  {" "}
                  $ <strong>
                    {" "}
                    {(item.price * item.quantity).toFixed(2)}
                  </strong>{" "}
                </p>
              </div>
              <hr></hr>
            </div>
          ))}
          <div className={styles.totals}>
            <div>
              <p>Impuestos</p>
              <p>$63</p>
            </div>
            <div className={styles.totalsPrice}>
              <h3>Total: </h3>
              <h3> $ {totalPrice.toFixed(2)} </h3>
            </div>
          </div>
          <div>
            <Link className={styles.linksPay}>
              {" "}
              Pay $ ( {totalPrice.toFixed(2)}){" "}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

ShoppingBag.propTypes = {
  bagItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  updateQuantity: PropTypes.func.isRequired,
};

export default ShoppingBag;