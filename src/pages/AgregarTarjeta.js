import React, { useState } from 'react';
import { agregarTarjeta } from '../services/api';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const AgregarTarjeta = () => {
    const { usuario } = useUser();
    const [formData, setFormData] = useState({
        numero_tarjeta: '',
        saldo_inicial: '',
    });
    const [error, setError] = useState(null);
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

        try {
            const tarjetaData = {
                ...formData,
                id_usuario: usuario.id,
            };
            const response = await agregarTarjeta(tarjetaData);

            if (response.error) {
                setError(response.error);
            } else {
                navigate('/pagina-principal');
            }
        } catch (err) {
            setError('Error al agregar tarjeta');
        }
    };

    return (
        <div className="container-form">
            <h2>Agregar Tarjeta</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <i className="fas fa-credit-card"></i>
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
                    <i className="fas fa-dollar-sign"></i>
                    <input
                        type="number"
                        name="saldo_inicial"
                        placeholder="Saldo Inicial"
                        value={formData.saldo_inicial}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Agregar</button>
            </form>
        </div>
    );
};

export default AgregarTarjeta;
