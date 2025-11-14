var express = require('express');
var router = express.Router();
var usuariosModel = require('./../../models/usuariosModel.js');

/* GET - Muestra la pantalla de login. */
router.get('/', function (req, res, next) {
    res.render('admin/login', {
        layout: 'admin/layout',
    });
});

/* GET - Cierra la sesión (Logout). */
router.get('/logout', function (req, res, next) {
    req.session.destroy();
    res.render('admin/login', {
        layout: 'admin/layout'
    });
});

/* POST - Procesa el formulario de login. */
router.post('/', async (req, res, next) => {
    try {
        var usuario = req.body.email;
        var password = req.body.password;

        // Llama a la función del modelo para verificar credenciales
        var data = await usuariosModel.getUserByEmailAndPassword(usuario, password);

        if (data) {
            // Autenticación exitosa: Crea variables de sesión
            req.session.id_usuario = data.id;
            req.session.nombre = data.nombre;
            res.redirect('/admin/novedades'); // Redirige al panel de administración
        } else {
            // Autenticación fallida: Renderiza la vista con mensaje de error
            res.render('admin/login', {
                layout: 'admin/layout',
                error: true
            });
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;