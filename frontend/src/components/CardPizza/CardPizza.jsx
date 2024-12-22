import './cardPizza.css'
import PropTypes from "prop-types";
import { useContext } from "react";
import { cartContext } from "../../contexts/cartContext";
import { Link } from "react-router-dom";


export const CardPizza = ({ name, desc, img, ingredients, price, id }) => {
       const {handleAgrega} = useContext(cartContext)



  return (
    <div className="card m-3" style={{width:"18rem"}}>
      <img src={img} className="card-img-top" alt={name} />
      <div className="card-body">
      <h5 className="card-title">{name}</h5>
      <p className="card-text">{desc}</p>
      <ul className="list-group list-group-flush">
      🍕Ingredientes: {ingredients.map((ingredient, index) => (
          <li key={index} className="list-group-item">{ingredient}</li>
        ))}
      </ul>
      <p className="mt-1 fw-bold">Precio: ${price}</p>
      <Link to={`/pizza/${id}`} className="btn btn-light m-2">Ver más 👀</Link>
      <button className="btn btn-dark pagar" onClick={() => handleAgrega(id)}>Añadir 🛒</button>
      </div>
    </div>
  );
};

// Validaciones de PropTypes
CardPizza.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired, 
  desc: PropTypes.string.isRequired, 
  img: PropTypes.string.isRequired, 
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired, 
  price: PropTypes.number.isRequired, 
};


