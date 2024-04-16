const Usuario = require('../models/usuario.model');

exports.get_login = (request, response, next) => {
    response.render('signup', {
        username: request.session.username || '',
        registro: false,
    });
};

exports.get_signup = (req, res, next) => {
    res.render('signup', {
        username: req.session.username || '',
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

exports.eliminar_usuario = (request, response, next) => {
    console.log(request.body.IDUsuario)
    Usuario.eliminar_usuario(request.body.IDUsuario)
    .then(([rows,fieldData]) => {
        Console.log("Registro eliminado exitosamente")
        response.redirect ('/Roles/equipo');
    }).catch((error) => {
        console.log(error)
        response.redirect ('/Roles/equipo');
    })
}