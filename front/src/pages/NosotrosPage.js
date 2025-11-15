import React from 'react';
import juan from '../../src/assets/nosotros/nosotros1.jpg';
import '../styles/components/pages/NosotrosPage.css';
import lore from '../../src/assets/nosotros/nosotros2.jpg';
import sergio from '../../src/assets/nosotros/nosotros3.jpg';
import ana from '../../src/assets/nosotros/nosotros4.jpg';

const NosotrosPage = () => {
  return (
    <section className="nosotros-container">
      <h2 className="historia-titulo">Nuestra Historia</h2>

      <div className="tarjetas-container">
        <div className="card">
          <img src={lore} className="card-img" alt="Lore Camargo" />
          <div className="card-body">
            <h2>Lore Camargo</h2>
            <p>Nuestra fundadora y actual CEO de la empresa.</p>
          </div>
        </div>

        <div className="card">
          <img src={juan} className="card-img" alt="Juan Gómez" />
          <div className="card-body">
            <h2>Juan Gómez</h2>
            <p>Se desempeña desde 2018 como Gerente General.</p>
          </div>
        </div>

        <div className="card">
          <img src={sergio} className="card-img" alt="Sergio Schtuz" />
          <div className="card-body">
            <h2>Sergio Schtuz</h2>
            <p>Coordinador del área de logística.</p>
          </div>
        </div>

        <div className="card">
          <img src={ana} className="card-img" alt="Ana Lhiebitz" />
          <div className="card-body">
            <h2>Ana Lhiebitz</h2>
            <p>Especialista en marketing y soporte estratégico.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NosotrosPage;