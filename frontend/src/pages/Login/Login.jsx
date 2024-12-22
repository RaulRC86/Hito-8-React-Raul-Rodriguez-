import './login.css';
import { useState, useEffect } from "react";
import { useUser } from '../../contexts/userContext';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const { login, token } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/profile");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setExito("");

    if (!email || !password) {
      setError("Ambos campos son obligatorios");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña es demasiado corta");
      return;
    }

    try {
      await login(email, password);
      setExito("¡Inicio de sesión exitoso!");
    } catch (error) {
      setError(error.message || "Error en el inicio de sesión");
    }
  };

  return (
    <div className="formulario">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
        {error && <p className="error">{error}</p>}
        {exito && <p className="exito">{exito}</p>}
      </form>
    </div>
  );
};

