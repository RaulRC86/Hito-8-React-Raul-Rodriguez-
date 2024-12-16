import './Login.css'

import { useState } from "react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setExito("");
    if (!email || !contraseña) {
      setError("Ambos campos son obligatorios");
      return;
    }
    if (contraseña.length < 6) {
      setError("La contraseña es demasiado corta");
      return;
    }
    setExito("¡Inicio de sesión exitoso!");
  };
  return (
    <>
    <div className="formulario">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            value={contraseña}
            onChange={(e) => {
              setContraseña(e.target.value);
            }}
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
        {/* Mostrar el error si existe */}
        {error && <p className="error">{error}</p>}
        {/* Mostrar mensaje de éxito si corresponde */}
        {exito && <p className="exito">{exito}</p>}
      </form>
      </div>
    </>
  );
};

