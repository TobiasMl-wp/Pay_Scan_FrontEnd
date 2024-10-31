import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { iniciarSesion } from '../services/api';
import { useUser } from '../context/UserContext';

const InicioSesion = () => {
    const { setUsuario } = useUser();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ correo: '', contraseña: '' });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await iniciarSesion(formData);

            if (response.error) {
                setError(response.error);
            } else if (response.usuario) {
                setUsuario(response.usuario);
                navigate('/pagina-principal');
            }
        } catch (err) {
            setError('Error al iniciar sesión');
        }
    };

    const handleRegistro = () => {
        navigate('/registro');
    };

    return (
        <div className="container">
            <h2>Inicio de Sesión</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <i className="fas fa-envelope"></i>
                    <input
                        type="email"
                        name="correo"
                        placeholder="Correo"
                        value={formData.correo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <i className="fas fa-lock"></i>
                    <input
                        type="password"
                        name="contraseña"
                        placeholder="Contraseña"
                        value={formData.contraseña}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">
                    <i className="fas fa-sign-in-alt"></i> Iniciar Sesión
                </button>
            </form>
            <button className="secondary" onClick={handleRegistro}>
                <i className="fas fa-user-plus"></i> Registrarse
            </button>
        </div>
    );
};

export default InicioSesion;
