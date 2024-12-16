import {createContext, useState} from "react";
import { pizzaCart } from "../assets/JS/pizzas";

export const CartContext = createContext()

export const CartProvider = ({children})=>{
    const [cart, setCart]= useState(pizzaCart)

    const updatePizzaCount = (id, increment = true) => { 
      setCart((prevCart) => 
        prevCart.map((pizza) =>
          pizza.id === id
            ? { ...pizza, count: increment ? pizza.count + 1 : pizza.count - 1 }
            : pizza
        ).filter((pizza) => pizza.count > 0)  
      )
    }


  

   
  const handleIncrease = (id) => updatePizzaCount(id, true); 

  
  const handleDecrease = (id) => updatePizzaCount(id, false);  

      const handleAgrega = (id) => {
  setCart((prevCart) => {
    const pizzaInCart = prevCart.find((pizza) => pizza.id === id);
    
    if (pizzaInCart) {
      return prevCart.map((pizza) =>
        pizza.id === id ? { ...pizza, count: pizza.count + 1 } : pizza
      );
    } else {
      const pizzaToAdd = pizzaCart.find((pizza) => pizza.id === id);
      return [...prevCart, { ...pizzaToAdd, count: 1 }];
    }
  });
};

const total = cart.reduce((acc, pizza) => {
    const price = isNaN(pizza.price) ? 0 : pizza.price;
    const count = isNaN(pizza.count) ? 0 : pizza.count;
    return acc + price * count;
  }, 0);

      const contextValue = {
        cart,
        handleIncrease,
        handleDecrease,
        handleAgrega,
        total,
      };

      return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}