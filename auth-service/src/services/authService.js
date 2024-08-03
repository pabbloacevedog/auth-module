// src/services/authService.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import models from '../models/index.js';
import { JWT_EXPIRES, JWT_SECRET } from '../config/config.js';

// Obtener un usuario por email
export async function obtenerUsuario(email) {
    return await models.User.findOne({ where: { email } });
}

// Generar token JWT
export async function generarToken(usuario) {
    const datosUsuario = usuario.get();
    return jwt.sign(datosUsuario, JWT_SECRET, { expiresIn: JWT_EXPIRES });
}

// Obtener las acciones (permisos) de un rol
export async function obtenerAcciones(roleId) {
    const role = await models.Role.findByPk(roleId, {
        include: [{
            model: models.Accion,
            through: { attributes: [] },
        }]
    });
    return role.acciones.map(accion => accion.name);
}

// Función para iniciar sesión
export async function login(email, password, res) {
    const usuario = await obtenerUsuario(email);

    if (!usuario) {
        throw new Error(`No tenemos ningún usuario registrado con el email ${email}. Por favor regístrese.`);
    }

    const passwordMatch = await bcrypt.compare(password, usuario.password);
    if (!passwordMatch) {
        throw new Error(`Lo sentimos, la contraseña que ingresaste es incorrecta. Inténtalo de nuevo.`);
    }

    const acciones = await obtenerAcciones(usuario.role_id);

    const token = await generarToken(usuario);

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    });

    return { token, userData: { ...usuario.get(), acciones } };
}

// Función para registrar un nuevo usuario
export async function signup(email, password) {
    const usuario = await obtenerUsuario(email);

    if (usuario) {
        throw new Error(`Ya tenemos un usuario registrado con el email ${email}. Por favor Inicie sesión.`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await models.User.create({
        email,
        password: hashedPassword,
        role_id: 2,
    });

    // Aquí puedes enviar el código de verificación por email

    return { message: "Usuario creado con éxito. Por favor valida tu email para continuar." };
}
