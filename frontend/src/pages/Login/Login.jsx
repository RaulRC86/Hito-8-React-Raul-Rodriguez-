import './login.css'

import { useState } from "react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setExito("");

    
    const response = await fetch("http://localhost:5000/api/auth/login",{
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
        email, 
        password,
      }),
    });

    const data= await response.json()
    localStorage.setItem("token", data.token)



    if (!email || !password) {
      setError("Ambos campos son obligatorios");
      return;
    }
    if (password.length < 6) {
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
            placeholder='Email'
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
            placeholder='Password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
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

