import './Register.css'
import { useState } from "react";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const validarDatos = (e) => {
    e.preventDefault();
    setError("");
    setExito("");

    if (!email.trim() || !password.trim() || !confirmar.trim()) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener más de 6 caracteres.");
      return;
    }
    if (password !== confirmar) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setError("El email debe tener una @ y un punto.");
      return;
    }

    setExito("¡Registro Exitoso!");
  };

  return (
    <>
    <div className="formulario">
      <form className="form" onSubmit={validarDatos}>

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
 
 
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
       
       
          <label>Confirmar Contraseña</label>
          <input
            type="password"
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
          />


        {/* Mostrar error si existe */}
        {error && <p className="error">{error}</p>}

        {/* Mostrar mensaje de éxito si corresponde */}
        {exito && <p className="exito">{exito}</p>}

        <button type="submit">Enviar</button>
      </form>
      </div>
    </>
  );
};


