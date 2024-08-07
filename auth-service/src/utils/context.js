import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.js'; // Asegúrate de que JWT_SECRET esté correctamente exportado desde config.js

// Función para verificar y obtener el usuario a partir del token JWT
const getUserToken = async (token) => {
    try {
        if (token) {
            // Pasa el token y la clave secreta a jwt.verify
            return jwt.verify(token, JWT_SECRET);
        }
        return null;
    } catch (error) {
        // Aquí podrías manejar o registrar el error específico
        console.error('Error verificando el token:', error);
        return null;
    }
};

// Función de contexto para Apollo Server
const context = async ({ req, res }) => {
    const token = req.cookies ? req.cookies.authToken : null;

    // Permitir operaciones públicas sin autenticación
    const publicOperations = ['PublicData', 'customerSignup', 'customerLogin', 'IntrospectionQuery'];
    if (publicOperations.includes(req.body.operationName)) {
        return {};
    }

    // Verificar si el token está presente
    if (!token) {
        throw new Error('No se proporcionó un token JWT.');
    }

    // Intentar recuperar un usuario con el token
    const user = await getUserToken(token);

    if (!user) {
        throw new Error('Usuario no autenticado.');
    }

    // Añadir el usuario al contexto
    return { user, req, res };
};

export default context;
