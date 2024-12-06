const {getConnection} = require('../../../config/database');

async function getComentarios() {
    try {
        const connection = await getConnection();
        const query = `select * from comentarios`;
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

async function postComentarios({ comentario, postId }) {
    try {
        const connection = await getConnection();
        const query = `INSERT INTO comentarios (comentario, post_id) VALUES (?, ?)`;
        const values = [comentario, postId];

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
        console.error("Error en postComentarios:", e);
        return { success: false, error: `${e}` };
    }
}

module.exports = {getComentarios,postComentarios}