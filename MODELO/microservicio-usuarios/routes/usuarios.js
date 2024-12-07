var express = require('express');
var router = express.Router();
const {getUsuarios,postUsuarios,getSesion} = require('../business/usuarios');

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/getUsers', async function(req, res, next) {
    const response = await getUsuarios();
    res.send(response);
});

router.post('/postUsers', async (req, res) => {
    const result = await postUsuarios(req.body);
    res.json(result);
});

router.post('/getSesion', async (req, res) => {
    console.log(req.body); // Asegúrate de que esté mostrando los datos correctamente
    const result = await getSesion(req.body, req);
    res.json(result);
});




module.exports = router;