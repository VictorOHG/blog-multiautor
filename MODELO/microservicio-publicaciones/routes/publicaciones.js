var express = require('express');
var router = express.Router();
const {getPublicaciones,postPublicaciones} = require('../business/publicaciones');

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/getPosts', async function(req, res, next) {
    const response = await getPublicaciones();
    res.send(response);
});

router.post('/postPosts', async (req, res) => {
    const result = await postPublicaciones(req.body);
    res.json(result);
});

module.exports = router;