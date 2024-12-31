import { useContext } from "react";
import { useUser, cartContext } from "../../contexts";
import "./Navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { setActiveClass } from "../../utilities/setActive";
import Swal from "sweetalert2";

export const Navbar = () => {
  const { total } = useContext(cartContext);
  const { token, logout } = useUser();
  const navigate = useNavigate();

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
        }).then(() => {
          navigate("/");
        });
      }
    });
  };

  return (
    <nav>
      <NavLink to="/">
        <button className={setActiveClass}>🍕Home</button>
      </NavLink>
      {token ? (
        <>
          <NavLink to="/profile">
            <button className={setActiveClass}>🔓Profile</button>
          </NavLink>
          <div className="logout-button">
            <button onClick={handleLogout} className="boton1">
              🔒Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <NavLink to="/login">
            <button className={setActiveClass}>🔐Login</button>
          </NavLink>
          <NavLink to="/register">
            <button className={setActiveClass}>🔐Register</button>
          </NavLink>
        </>
      )}
      <div className="totalCompra">
        <Link to="/cart">
          <button className="boton2">🛒Total:$ {total.toFixed(0)}</button>
        </Link>
      </div>
    </nav>
  );
};
