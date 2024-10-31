import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerRecargas } from '../services/api';
import '../styles/HistorialRecargas.css';

const HistorialRecargas = () => {
    const { id } = useParams();
    const [recargas, setRecargas] = useState([]);

    useEffect(() => {
        const fetchRecargas = async () => {
            const data = await obtenerRecargas(id);
            setRecargas(data);
        };

        fetchRecargas();
    }, [id]);

    return (
        <div className="historial-recargas">
            <h2>Historial de Recargas</h2>
            {recargas.length > 0 ? (
                <table className="tabla-recargas">
                    <thead>
                        <tr>
                            <th>Monto</th>
                            <th>Fecha</th>
                            <th>Método de Pago</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recargas.map((recarga) => (
                            <tr key={recarga.id}>
                                <td>${recarga.monto}</td>
                                <td>{new Date(recarga.fecha).toLocaleString()}</td>
                                <td>{recarga.metodo_pago}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay recargas registradas para esta tarjeta.</p>
            )}
        </div>
    );
};

export default HistorialRecargas;
