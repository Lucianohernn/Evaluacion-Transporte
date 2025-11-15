import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Nav from './components/layout/Nav';

import ContactoPage from './pages/ContactoPage';
import HomePage from './pages/HomePage';
import NosotrosPage from './pages/NosotrosPage';
import NovedadesPage from './pages/NovedadesPage';
import LoginRegister from './pages/LoginRegister';

function App() {
  return (
    <div className="App">
      {/* BrowserRouter envuelve Header, Nav, Routes y Footer para que hooks de react-router (useNavigate, etc.) funcionen */}
      <BrowserRouter>
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/nosotros" element={<NosotrosPage />} />
          <Route path="/novedades" element={<NovedadesPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/login" element={<LoginRegister />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;