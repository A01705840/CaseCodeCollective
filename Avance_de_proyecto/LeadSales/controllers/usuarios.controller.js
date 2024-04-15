const Usuario = require('../models/usuario.model');

exports.get_login = (request, response, next) => {
    response.render('signup', {
        username: request.session.username || '',
        registro: false,
        permisos: request.session.permisos || [],
    });
};

exports.post_login = (request, response, next) => {
    request.session.username = request.body.username;
    response.redirect('/');
};

exports.get_signup = (req, res, next) => {
    res.render('signup', {
        username: req.session.username || '',
        permisos: req.session.permisos || '',
        registro: true,
    });
};

exports.post_signup = (req, res, next) => {
    const nuevo_usuario = new Usuario(
        req.body.username, req.body.name, req.body.password
    );
    nuevo_usuario.save()
        .then(() => {
            res.redirect('/usuario/login');
        })
        .catch((error) => {
            console.log(error);
            req.sesion.error = 'Nombre de usuario ya existe';
            res.redirect('/usuario/signup');
        });
};

exports.get_logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/usuario/login'); //Este código se ejecuta cuando la sesión se elimina.
    });
};