import './login.css';
import { useState, useEffect } from "react";
import { useUser } from '../../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const Login = () => {
  const { login, token } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/profile");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Campos obligatorios',
        text: 'Por favor, completa ambos campos.',
      });
      return;
    }

    if (password.length < 6) {
      Swal.fire({
        icon: 'warning',
        title: 'Contraseña corta',
        text: 'La contraseña debe tener al menos 6 caracteres.',
      });
      return;
    }

    try {
      await login(email, password);
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        text: '¡Bienvenido!',
        confirmButtonText: 'Continuar',
      }).then(() => {
        navigate("/profile");
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el inicio de sesión',
        text: error.message || 'Hubo un problema al iniciar sesión.',
      });
    }
  };

  return (
    <div className="formulario">
      <form onSubmit={handleSubmit}>     
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />        
          <label>Contraseña</label>
          <input 
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
      
        <button className='botón' type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

