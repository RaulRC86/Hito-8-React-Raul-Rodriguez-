import { useEffect, useState } from "react"
import { useUser } from "../../contexts/userContext"

export const Profile = () => {
  const {getProfile, token, logout} = useUser();
  const [userData, setUserData] = useState(null);

  useEffect(()=>{
    const fetchProfile = async () =>{
      if(token){
        const data = await getProfile();
        setUserData(data);
      }
    };  
    fetchProfile();

}, [token, getProfile])

const handleLogout = () => {
  logout();
};

  return (
    <div className="perfil">
      {userData ? (
        <>
        <p>Nombre: {userData.email}</p>
        <p>Correo: {userData.email}</p>
        
      
      <button onClick={handleLogout} className="btn btn-light">
      <span className="botonP">🔒Logout</span>
    </button>
    </>
   
     ) : (
    <p>Cargando perfil...</p>
  )}
   </div>
   )
  }



