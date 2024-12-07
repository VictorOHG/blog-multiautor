const bcrypt = require('bcrypt');
const { getConnection } = require('../config/database');

async function getUsuarios() {
    try {
        const connection = await getConnection();
        const query = `SELECT * FROM Usuarios`;
        let result;
        try {
            result = await connection.query(query);
        } catch (e) {
            await connection.release();
            throw e;
        }
        await connection.release();
        return { success: true, data: result };
    } catch (e) {
        return { success: false, error: `${e}` };
    }
}

async function getSesion(usersData, req) {
    try {
        const connection = await getConnection();
        const query = `SELECT * FROM Usuarios WHERE username = ?`;
        const values = [usersData.username];
        let result;

        try {
            result = await connection.query(query, values);
        } finally {
            await connection.release();
        }

        if (result.length === 0) {
            return { success: false, message: "Usuario o contraseña incorrectos" };
        }

        const user = result[0];

        // Comparar la contraseña proporcionada con la almacenada
        const isMatch = await bcrypt.compare(usersData.contrasena, user.contrasena);
        if (!isMatch) {
            return { success: false, message: "Usuario o contraseña incorrectos" };
        }

        req.session.user = {
            id: user.user_id,
            username: user.username,
            email: user.email,
        };

        return { success: true, data: req.session.user };
    } catch (e) {
        console.error("Error en getSesion:", e);
        return { success: false, error: `${e}` };
    }
}

async function postUsuarios(usersData) {
    try {
        const connection = await getConnection();

        // Generar el hash de la contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(usersData.contrasena, saltRounds);

        const query = 'INSERT INTO Usuarios (username, email, contrasena, created_at) VALUES (?, ?, ?, NOW())';
        const values = [usersData.username, usersData.email, hashedPassword];

        let result;
        try {
            result = await connection.query(query, values);
        } catch (e) {
            await connection.rollback();
            await connection.release();
            throw e;
        }
        await connection.commit();
        await connection.release();
        return { success: true, data: result };
    } catch (e) {
        return { success: false, error: `${e}` };
    }
}

module.exports = { getUsuarios, postUsuarios, getSesion };
