// SimulacionPago.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SimulacionPago = () => {
    const navigate = useNavigate();

    const handleFinalizarPago = () => {
        alert("Pago simulado completado con éxito.");
        navigate("/"); // Redirige a la página de inicio o a la que desees
    };

    const handleCancelarPago = () => {
        alert("Pago simulado cancelado.");
        navigate("/recarga"); // Redirige de nuevo a la página de recarga
    };

    return (
        <div className="container">
            <h2>Simulación de Pago - Transferencia</h2>
            <p>Estás siendo redirigido a una página simulada de pago por transferencia.</p>
            <p>Monto a depositar: $[Monto de Recarga]</p>
            <button onClick={handleFinalizarPago} className="button">Finalizar Pago</button>
            <button onClick={handleCancelarPago} className="button secondary">Cancelar Pago</button>
        </div>
    );
};

export default SimulacionPago;
