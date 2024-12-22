import { useContext } from "react";
import {cartContext, useUser} from '../../contexts'
import "./Cart.css"

export const Cart = () => {
  const {cart, handleIncrease, handleDecrease, total}= useContext(cartContext)
  const {token} = useUser()

  return (
    <div className="container mt-5">
      <h2>Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <ul className="list-group">
          {cart.map((pizza) => (
            <li
              key={pizza.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <img
                  src={pizza.img}
                  alt={pizza.name}
                  style={{ width: "100px", marginRight: "10px" }}
                />
                <h5>Pizza {pizza.name}</h5>
                <p>Precio unitario: ${pizza.price}</p>
                <p>Cantidad: {pizza.count}</p>
              </div>
              <div>
                <button
                  className="btn btn-danger btn-sm me-2"
                  onClick={() => handleDecrease(pizza.id)}
                >
                  -
                </button>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => handleIncrease(pizza.id)}
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ${total.toFixed(0)}</h3>
      <button className="btn btn-primary mt-3"
      disabled={!token}>Pagar</button>
    </div>
  );
};

