import React, { useState } from 'react';
import axios from 'axios';
import '../styles/components/pages/ContactoPage.css';


const ContactoPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });

  const [msg, setMsg] = useState('');
  const [sending, setSending] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSending(true);
    setMsg('');

    try {
      const response = await axios.post('http://localhost:3001/api/contact', formData);
      if (response.data.ok) {
        setMsg('Mensaje enviado correctamente ✅');
        setFormData({ nombre: '', email: '', telefono: '', mensaje: '' });
      } else {
        setMsg(response.data.msg || 'Error al enviar ❌');
      }
    } catch (error) {
      console.error(error);
      setMsg('Error de conexión con el servidor ❌');
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="contacto-container">
      <section className="contacto-card">
        <h2 className="contacto-titulo">Contacto Rápido</h2>

        <form className="formulario" onSubmit={handleSubmit}>
          <div className="campo">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Tu nombre"
            />
          </div>

          <div className="campo">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div className="campo">
            <label htmlFor="telefono">Teléfono</label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="Tu teléfono"
            />
          </div>

          <div className="campo">
            <label htmlFor="mensaje">Mensaje</label>
            <textarea
              name="mensaje"
              rows="4"
              value={formData.mensaje}
              onChange={handleChange}
              placeholder="Escribí tu mensaje..."
            />
          </div>

          <button type="submit" className="btn-enviar" disabled={sending}>
            {sending ? 'Enviando...' : 'Enviar'}
          </button>

          {msg && <p className="msg">{msg}</p>}
        </form>
      </section>

      <section className="contacto-info">
        <h2>Otras vías de comunicación</h2>
        <p>También puede contactarse con nosotros usando los siguientes medios:</p>
        <ul>
          <li>📞 Teléfono: 4324-2499</li>
          <li>📧 Email: contacto@transpore.com.ar</li>
          <li>💬 Facebook</li>
          <li>🐦 Twitter</li>
          <li>📞 Skype</li>
        </ul>
      </section>
    </main>
  );
};

export default ContactoPage;