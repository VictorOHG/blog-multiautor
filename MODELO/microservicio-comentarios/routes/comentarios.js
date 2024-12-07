var express = require('express');
var router = express.Router();

const {getComentarios,postComentarios} = require('../business/comentarios');

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/getComments', async function(req, res, next) {
    const response = await getComentarios();
    res.send(response);
});

router.post('/postComments', async (req, res) => {
    const { comentario, postId } = req.body;

    if (!comentario || !postId) {
        return res.status(400).json({ success: false, message: "Faltan datos requeridos (comentario o postId)." });
    }

    try {
        const nuevoComentario = await postComentarios.create({
            comentario,
            post_id: postId,
        });

        res.json({ success: true, data: nuevoComentario });
    } catch (error) {
        console.error("Error al crear comentario:", error);
        res.status(500).json({ success: false, message: "Error al crear el comentario." });
    }
});



module.exports = router;