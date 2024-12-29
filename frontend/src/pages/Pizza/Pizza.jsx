import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {CardPizza} from "../../components/CardPizza/CardPizza"
import './pizza.css'



export const Pizza = () => {
  const {id}= useParams();
  console.log(id)
  const [pizzas, setPizzas] = useState([])

  const backEnd= "http://localhost:5000/api/pizzas/"

  useEffect(() => {
    const consultaApi = async () => {
      const res = await fetch(`${backEnd}/${id}`)
      const data= await res.json()
      setPizzas([data]) 
    }
    consultaApi()
  }, [id])
  return (
    <>
 <div className="pizzaContainer">
    {pizzas.map(
      (pizza) => (
        <CardPizza
        key={pizza.id}
        name={pizza.name}
        desc={pizza.desc}
        img={pizza.img}
        ingredients={pizza.ingredients}
        price={pizza.price}
        />
      )
    )}</div>
    </>
  )
}

