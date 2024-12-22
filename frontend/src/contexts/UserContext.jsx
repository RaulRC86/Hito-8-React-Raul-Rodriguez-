import   { createContext, useContext, useEffect, useState } from "react";

const UserContext= createContext()

export const UserProvider = ({children}) => {

const storedToken= localStorage.getItem("token")
const [token, setToken] = useState(storedToken || null)
const [email, setEmail] = useState(localStorage.getItem("email") || null) 

const logout =() => {
    localStorage.removeItem("token")
    localStorage.removeItem("email")
    setToken(null)
    setEmail(null)
};
const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setToken(data.token);
        setEmail(email);
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", email);
      } else {
        throw new Error(data.message || "Error en el login");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const register = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setToken(data.token);
        setEmail(email);
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", email);
      } else {
        throw new Error(data.message || "Error en el registro");
      }
    } catch (error) {
      console.error("Registration failed:", error.message);
    }
  };

  const getProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Profile fetch failed:", error.message);
    }
  };


useEffect(() => {
    if (token){
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
    } else {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
    }
}, [token, email])

return(
    <UserContext.Provider value={{token, setToken, email, login, register, logout, getProfile}}>
        {children}
    </UserContext.Provider>
)
}

export const useUser = () => useContext(UserContext)