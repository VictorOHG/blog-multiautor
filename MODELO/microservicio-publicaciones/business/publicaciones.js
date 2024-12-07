const {getConnection} = require('../config/database');

async function getPublicaciones() {
    try {
        const connection = await getConnection();
        const query = `select * from Publicaciones`;
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

async function postPublicaciones(publisData) {
    try {
        const connection = await getConnection();
        const query = `INSERT INTO Publicaciones (titulo, contenido, created_at, updated_at) VALUES (?, ?, NOW(), NOW())`;
        const values = [publisData.titulo, publisData.contenido];

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

        // Incluye created_at en la respuesta
        return {
            success: true,
            data: {
                postId: result.insertId,
                createdAt: new Date(), // Hora actual como simulación
            },
        };
    } catch (e) {
        return { success: false, error: `${e}` };
    }
}

module.exports = {getPublicaciones,postPublicaciones}