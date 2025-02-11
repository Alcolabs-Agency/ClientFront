import React from "react";
import styles from "./ShoppingBag.module.css";
import { Link, useNavigate } from "react-router-dom";

export default function ShoppingBag({ bagItems, updateQuantity }) {
  const navigate = useNavigate()
  async function validateStock(bagItems) {
    const productsToValidate = bagItems.map((item) => ({
      documentId: item.documentId,
      quantity: item.quantity
    }));
    try {
      const response = await fetch("http://localhost:4000/api/products/validate",
        {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNzM4NzE1NzgxLCJleHAiOjE3NDEzMDc3ODF9.va7BjfrYzfNi8h2k2WVRN_VGg19cdyLJbvw09B512mE"
          },
          body: JSON.stringify({products: productsToValidate})
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error)
      }
      const data = await response.json()
      return data
    } catch (error) {
      throw new Error(error.message || "Error en la petición");
    }
  }

  const totalPrice = bagItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  async function handlePayClick () {
    try {
      await validateStock(bagItems)
      navigate("/PaymentOptions", {state: {bagItems, totalPrice}})
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className={styles.conatiner}>
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
            <div className={styles.items}>
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
            <button 
              className={styles.linksPay}
              onClick={handlePayClick}
            >
              {" "}
              Pay $ ( {totalPrice.toFixed(2)}){" "}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
