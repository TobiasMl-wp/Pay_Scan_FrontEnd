import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { recargarTarjeta } from '../services/api';
import { useUser } from '../context/UserContext';

const RecargarTarjeta = () => {
    const { id } = useParams();
    const { usuario } = useUser();
    const [formData, setFormData] = useState({
        numero_tarjeta: '',
        monto_recarga: '',
        metodo_pago: 'Transferencia', // Método de pago fijo
    });
    const [error, setError] = useState(null);
    const [showPaymentSimulation, setShowPaymentSimulation] = useState(false); // Estado para mostrar simulación de pago
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const datosRecarga = {
            ...formData,
            usuario: usuario.id,
            idTarjeta: id,
        };

        try {
            const response = await recargarTarjeta(datosRecarga);

            if (response.error) {
                setError(response.error);
            } else if (response.tarjeta_actualizada) {
                // En lugar de navegar inmediatamente, muestra la simulación de pago
                setShowPaymentSimulation(true);
            } else {
                setError('Error inesperado al recargar la tarjeta.');
            }
        } catch (err) {
            setError('Error al recargar tarjeta.');
        }
    };

    return (
        <div className="container-form">
            <h2>Recargar Tarjeta</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <i className="fas fa-credit-card"></i> {/* Ícono de tarjeta */}
                    <input
                        type="text"
                        name="numero_tarjeta"
                        placeholder="Número de Tarjeta"
                        value={formData.numero_tarjeta}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <i className="fas fa-dollar-sign"></i> {/* Ícono de dólar */}
                    <input
                        type="number"
                        name="monto_recarga"
                        placeholder="Monto de Recarga"
                        value={formData.monto_recarga}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group metodo-pago">
                    <span>Método de pago: <strong>Transferencia</strong></span> {/* Texto sin ícono */}
                </div>
                <button type="submit">Recargar</button>
            </form>

            {/* Simulación de enlace a la página de pago */}
            {showPaymentSimulation && (
                <div className="payment-simulation">
                    <p>Para completar la recarga, transferencia en el siguiente enlace:</p>
                    <a
                        href="https://link.mercadopago.com.ar/payscan" // Enlace simulado
                        target="_blank"
                        rel="noopener noreferrer"
                        className="simulated-payment-link"
                    >
                        Ir a la página de pago
                    </a>
                    <button onClick={() => navigate('/pagina-principal')}>Volver a la página principal</button>
                </div>
            )}
        </div>
    );
};

export default RecargarTarjeta;
