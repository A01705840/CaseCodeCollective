const Usuario = require('../models/usuario.model');

const bcrypt = require('bcryptjs');
exports.get_login = (request, response, next) => {
    console.log('GET LOGIN');
    console.log('SESSION' + JSON.stringify(request.session));
    console.log('BODY' + JSON.stringify(request.body));
    response.render('signup', {
        username: request.session.username || '',
        registro: false,
        csrfToken: request.csrfToken(),
        //permisos: request.session.permisos || [],
    });
};

exports.post_login = (request, response, next) => {
    console.log('POST LOGIN');
    console.log('BODY' + JSON.stringify(request.body));
    Usuario.fetchOne(request.body.username)
        .then(([usuarios]) => {
            if (usuarios.length == 1) {
                const usuario = usuarios[0];
                bcrypt.compare(request.body.password, usuario.Password)
                    .then((doMatch) => {
                        if(doMatch) {
                            console.log('DOMATCH: ' + doMatch);
                            request.session.username = usuario.UserName;
                            request.session.isLoggedIn = true;
                            response.redirect('/');
                        } else {
                            equest.session.error = "Usuario y/o contraseña incorrectos";
                            response.redirect('/usuario/login');
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                request.session.error = "Usuario y/o contraseña incorrectos";
                response.redirect('/usuario/login');
            }
        })
        .catch((error) => {console.log(error);});
};

exports.get_signup = (req, res, next) => {
    console.log('GET SIGNUP');
    res.render('signup', {
        username: req.session.username || '',
        permisos: req.session.permisos || '',
        registro: true,
        csrfToken: req.csrfToken(),
    });
};

exports.post_signup = (req, res, next) => {
    console.log('POST SIGNUP')
    console.log('BODY' + JSON.stringify(req.body));
    const nuevo_usuario = new Usuario(
        req.body.username, req.body.correo, req.body.name, req.body.password
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
    console.log('GET LOGOUT');
    request.session.destroy(() => {
        response.redirect('/usuario/login'); //Este código se ejecuta cuando la sesión se elimina.
    });
};