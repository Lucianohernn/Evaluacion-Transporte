import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import NovedadItem from '../components/novedades/NovedadItem';
import '../styles/components/pages/NovedadesPage.css';

const NovedadesPage = (props) => {
  const [loading, setLoading] = useState(false);
  const [novedades, setNovedades] = useState([]);

  useEffect(() => {
    const cargarNovedades = async () => {
      setLoading(true);
  const response = await axios.get(`${API_URL}/novedades`);
      setNovedades(response.data);
      setLoading(false);
    };
    cargarNovedades();
  }, []);
    
  return (
    <section className="holder">
      <h2>Novedades</h2>
      {loading ? (
        <p>Cargando novedades...</p>
      ) : (
        novedades.map((item) => <NovedadItem key={item.id} title={item.titulo} subtitle={item.subtitulo} imagen={item.imagen} body={item.cuerpo} />)
      )}
    </section>
  );
};

export default NovedadesPage;