import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Bienvenida from './pages/Bienvenida';
import Registro from './pages/Registro';
import InicioSesion from './pages/InicioSesion';
import PaginaPrincipal from './pages/PaginaPrincipal';
import AgregarTarjeta from './pages/AgregarTarjeta';
import RecargarTarjeta from './pages/RecargarTarjeta';  // Ruta corregida
import HistorialRecargas from './pages/HistorialRecargas';
import SimulacionPago from './pages/SimulacionPago';  // Nueva página de simulación de pago
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Bienvenida />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/iniciar-sesion" element={<InicioSesion />} />
          <Route path="/pagina-principal" element={<PaginaPrincipal />} />
          <Route path="/agregar-tarjeta" element={<AgregarTarjeta />} />
          <Route path="/recargar-tarjeta/:id" element={<RecargarTarjeta />} />
          <Route path="/tarjeta/:id/recargas" element={<HistorialRecargas />} />
          <Route path="/simulacion-pago" element={<SimulacionPago />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
