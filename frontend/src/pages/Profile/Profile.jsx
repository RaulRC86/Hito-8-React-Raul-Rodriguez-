import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

export const Profile = () => {
  const [user, setUser] = useState(null)

  useEffect(()=> {
    const token = localStorage.getItem("token");

    if (token){
      fetch("http://localhost:5000/api/auth/me",{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response)=> response.json())
      .then ((data)=> setUser(data))
    }
  }, [])
  return (
    <>
    <div className="perfil">
      {user ? (
        <p>Email: {user.email}</p>
      ) : (
        <p>Por favor ingresa para ver tu perfil</p>
      )}

    <Link to="/" className="btn btn-light"><span className="botonP">🔒Logout</span></Link>
    </div>
    </>
  )
}

