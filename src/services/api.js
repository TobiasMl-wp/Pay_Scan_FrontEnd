const API_URL = 'http://localhost:5000';  // Dirección del backend

// Obtener la hora del servidor
export const getServerTime = async () => {
  try {
    const response = await fetch(`${API_URL}/`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data from backend:', error);
    return null;
  }
};

// Registrar un usuario
export const registrarUsuario = async (usuario) => {
  try {
    const response = await fetch(`${API_URL}/usuarios/registrar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario),
    });
    return await response.json();
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return null;
  }
};

// Iniciar sesión
export const iniciarSesion = async (credenciales) => {
  try {
    const response = await fetch(`${API_URL}/usuarios/iniciar-sesion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credenciales),
    });
    return await response.json();
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return null;
  }
};

// Agregar tarjeta
export const agregarTarjeta = async (tarjeta) => {
  try {
    const response = await fetch(`${API_URL}/tarjetas/agregar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tarjeta),
    });
    return await response.json();
  } catch (error) {
    console.error('Error al agregar tarjeta:', error);
    return null;
  }
};

// Recargar tarjeta
export const recargarTarjeta = async (datosRecarga) => {
  try {
    const response = await fetch(`${API_URL}/tarjetas/recargar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosRecarga),
    });
    return await response.json();
  } catch (error) {
    console.error('Error al recargar tarjeta:', error);
    return null;
  }
};

// Obtener el historial de recargas de una tarjeta
export const obtenerRecargas = async (idTarjeta) => {
  const response = await fetch(`/tarjetas/${idTarjeta}/recargas`);
  const data = await response.json();
  return data.recargas;
};

// Obtener la tarjeta del usuario
export const obtenerTarjeta = async (idUsuario) => {
  const response = await fetch(`/usuarios/${idUsuario}/tarjetas`);
  const data = await response.json();
  return data.tarjetas;
};
