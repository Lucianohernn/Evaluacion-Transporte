import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/components/layout/Header.css';
import logo from '../../assets/logo.png';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { API_URL } from '../../config';


// 🔧 URL de tu backend (ajustala si usás otro puerto)
const LOGOUT_URL = `${API_URL}/auth/logout`;
const PROFILE_URL = `${API_URL}/auth/perfil`;


const Header = ({ authTrigger, onReservarClick }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [username, setUsername] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ FUNCIÓN: verifica si el usuario está logueado en el backend
  const checkLogin = async () => {
    try {
      const res = await axios.get(PROFILE_URL, { withCredentials: true }); // Consulta a /auth/perfil del backend para saber si hay una sesión activa.
      if (res.data && res.data.perfil) {
        setIsLoggedIn(true);
        setUsername(res.data.perfil.nombre);
      } else {
        setIsLoggedIn(false);
        setUsername('');
      }
    } catch (error) {
      setIsLoggedIn(false);
      setUsername('');
    }
  };

  // 🧠 useEffect: se ejecuta al montar el componente o si cambia authTrigger
  useEffect(() => {
    checkLogin();
  }, [authTrigger]);

  // 🚪 FUNCIÓN: cerrar sesión
  const handleLogout = async () => {
    try {
      await axios.get(LOGOUT_URL, { withCredentials: true }); // Permite que el navegador envíe la cookie de sesión.
    } catch (error) {
      console.error("Error al cerrar sesión en el servidor:", error);
    }

    // Actualiza el estado local y limpia el almacenamiento
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");

    setIsLoggedIn(false);
    setUsername('');
    setIsMenuOpen(false);

    navigate("/login"); 
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <header>
      <div className="holder">
        <img src={logo} width="100" alt="Transportes X" />
        <h1>Transportes X</h1>

        {/* 👤 Ícono de usuario */}
        <div className="user-section">
          <FontAwesomeIcon icon={faUser} onClick={() => setIsMenuOpen(!isMenuOpen)} />
          {isMenuOpen && (
            <div className="user-menu">
              {isLoggedIn ? (
                <>
                  <p>Hola, {username}</p>
                  <button onClick={handleLogout}>Cerrar sesión</button>
                </>
              ) : (
                <>
                  <button onClick={() => navigate('/login')}>Iniciar sesión</button>
                  <button onClick={() => navigate('/register')}>Registrarse</button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
