import './Register.css';
import { useState } from "react";
import { useUser } from "../../contexts/userContext";
import Swal from "sweetalert2";

export const Register = () => {
  const { register } = useUser(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");

  const validarDatos = async (e) => {
    e.preventDefault();


    if (!email.trim() || !password.trim() || !confirmar.trim()) {
      Swal.fire({
        icon: "error",
        title: "Campos obligatorios",
        text: "Todos los campos son obligatorios.",
      });
      return;
    }
    if (password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Contraseña inválida",
        text: "La contraseña debe tener más de 6 caracteres.",
      });
      return;
    }
    if (password !== confirmar) {
      Swal.fire({
        icon: "error",
        title: "Contraseñas no coinciden",
        text: "Asegúrate de que ambas contraseñas sean iguales.",
      });
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      Swal.fire({
        icon: "error",
        title: "Email inválido",
        text: "El email debe contener una '@' y un punto.",
      });
      return;
    }

 
    try {
      await register(email, password); 
      Swal.fire({
        icon: "success",
        title: "¡Registro exitoso!",
        text: "Tu cuenta ha sido creada correctamente.",
        confirmButtonText: "Iniciar sesión",
      }).then(() => {
        
        window.location.href = "/login";
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error en el registro",
        text: error.message || "No se pudo completar el registro.",
      });
    }
  };

  return (
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
        <input className='password'
          type="password"
          value={confirmar}
          onChange={(e) => setConfirmar(e.target.value)}
        />

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};
