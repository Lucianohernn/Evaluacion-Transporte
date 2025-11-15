import React from 'react';
import '../styles/components/pages/NovedadesPage.css';

const LoginRegister = () => {
  return (
    <section className="holder">
      <h2>Login / Register</h2>
      <div className="login-container">
        <form className="login-form">
          <label>
            Email:
            <input type="email" name="email" />
          </label>
          <label>
            Contraseña:
            <input type="password" name="password" />
          </label>
          <div>
            <button type="submit">Login</button>
            <button type="button">Registrarse</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginRegister;
