import React from 'react';
import { useNavigate } from 'react-router-dom';

const Bienvenida = () => {
  const navigate = useNavigate();

  const handleIniciar = () => {
    navigate('/iniciar-sesion');
  };

  return (
    <div className="container">
      <h1>¡¡Bienvenido!!</h1>
      <div className="logo-container">
        <img src="/LogoPayScan.png" alt="Logo de Pay Scan" />
      </div>
      <button onClick={handleIniciar}>Iniciar</button>
    </div>
  );
};

export default Bienvenida;
