import './Home.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState,useEffect } from "react";
import {CardPizza} from "../../components/CardPizza/CardPizza";

export const Home = () => {

    const [pizzas, setPizzas] = useState([])
    const backEnd= "http://localhost:5000/api/pizzas"
  
    useEffect(() => {
      const consultaApi = async () => {
        const res = await fetch(backEnd)
        const data= await res.json()
        setPizzas(data) 
      }
      consultaApi()
    }, [])
    return (
      <>
      <div className="container mt-4">
        <div className="row">
      {pizzas.map(
        (pizza) => (
          <div className="col" key={pizza.id}>
          <CardPizza
          id ={pizza.id}
          name={pizza.name}
          img={pizza.img}
          ingredients={pizza.ingredients}
          price={pizza.price}
          />
          </div>
        )
      )}
      </div>
      </div>
      </>
    )
  }
  


