var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Verificar si hay una sesión activa
router.get('/isAuthenticated', (req, res) => {
    if (req.session.user) {
        res.status(200).json({ success: true, user: req.session.user });
    } else {
        res.status(200).json({ success: false, message: "No hay una sesión activa" });
        window.location.href = "iniciarSesion.html"; // Redirigir si no hay sesión

    }
});

module.exports = router;