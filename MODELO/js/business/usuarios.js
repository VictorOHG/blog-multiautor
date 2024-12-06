const {getConnection} = require('../../../config/database');

async function getUsuarios() {
    try {
        const connection = await getConnection();
        const query = `select * from Usuarios`;
        let result;
        try {
            result = await connection.query(query);
        } catch (e) {
            await connection.release();
            throw e;
        }
        await connection.release();
        return { success: true, data: result }
    } catch (e) {
        return { success: false, error: `${e}`}
    }
}

async function getSesion(usersData, req) {
    try {
        const connection = await getConnection();
        const query = `SELECT * FROM Usuarios WHERE username = ? AND contrasena = ?`;
        const values = [usersData.username, usersData.contrasena];
        let result;

        try {
            // Realiza la consulta para verificar el usuario y contraseña
            result = await connection.query(query, values);
        } finally {
            // Libera la conexión siempre, incluso en caso de error
            await connection.release();
        }

        // Si no se encuentra el usuario, retorna error
        if (result.length === 0) {
            return { success: false, message: "Usuario o contraseña incorrectos" };
        }

        // Si se encuentra, guarda los datos en la sesión
        const user = result[0];
        req.session.user = {
            id: user.user_id, // Ajusta según los campos de tu tabla
            username: user.username,
            email: user.email, // Incluye otros datos si es necesario
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
        const query = 'INSERT INTO Usuarios (username,email,contrasena, created_at) VALUES (?,?,?, NOW())';
        const values = [usersData.username,usersData.email,usersData.contrasena];

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

module.exports = {getUsuarios,postUsuarios, getSesion}