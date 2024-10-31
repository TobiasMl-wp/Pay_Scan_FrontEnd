import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerTarjeta } from '../services/api';
import { useUser } from '../context/UserContext';
import '../styles/global.css';

const PaginaPrincipal = () => {
    const [tarjetas, setTarjetas] = useState([]);
    const navigate = useNavigate();
    const { usuario } = useUser();

    useEffect(() => {
        const fetchTarjetas = async () => {
            if (usuario) {
                const tarjetas = await obtenerTarjeta(usuario.id);
                setTarjetas(tarjetas);
            }
        };
        fetchTarjetas();
    }, [usuario]);

    const handleAgregarTarjeta = () => navigate('/agregar-tarjeta');
    const handleRecargarTarjeta = (idTarjeta) => navigate(`/recargar-tarjeta/${idTarjeta}`);
    const handleVerHistorial = (idTarjeta) => navigate(`/tarjeta/${idTarjeta}/recargas`);

    return (
        <div className="container">
            <h2>Pay Scan App</h2>
            {tarjetas.length > 0 ? (
                <div className="tarjetas-container">
                    {tarjetas.map((tarjeta) => (
                        <div key={tarjeta.id} className="tarjeta-contenedor">
                            <p><strong>Número de Tarjeta:</strong> {tarjeta.numero_tarjeta}</p>
                            <p><strong>Saldo Actual:</strong> ${tarjeta.saldo}</p>
                            <button 
                                onClick={() => handleRecargarTarjeta(tarjeta.id)} 
                                className="btn-recargar"
                            >
                                Recargar Tarjeta
                            </button>
                            <button 
                                onClick={() => handleVerHistorial(tarjeta.id)} 
                                className="btn-historial"
                            >
                                Ver Historial de Recargas
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No hay tarjetas registradas</p>
            )}
            <button onClick={handleAgregarTarjeta} className="btn-primary">
                Agregar Tarjeta
            </button>
        </div>
    );
};

export default PaginaPrincipal;
