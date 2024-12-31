import { useEffect, useState } from "react";
import { useUser } from "../../contexts/userContext";
import Swal from "sweetalert2";

export const Profile = () => {
  const { getProfile, token, logout } = useUser();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (token) {
        const data = await getProfile();
        setUserData(data);
      }
    };
    fetchProfile();
  }, [token, getProfile]);

  const handleLogout = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se cerrará tu sesión.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire({
          title: "Sesión cerrada",
          text: "Has cerrado sesión exitosamente.",
          icon: "success",
          confirmButtonText: "Ok",
        });
      }
    });
  };

  return (
    <div className="perfil">
      {userData ? (
        <>
          <p>Correo: {userData.email}</p>
          <button onClick={handleLogout} className="btn btn-light">
            <span className="botonP">🔒Logout</span>
          </button>
        </>
      ) : (
        <p>Cargando perfil...</p>
      )}
    </div>
  );
};
