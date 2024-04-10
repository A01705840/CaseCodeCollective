const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');

exports.get_login = (request, response, next) => {
    const error = request.session.error || '';
    request.session.error = '';
    response.render('signup', {
        username: request.session.username || '',
        registro: false,
        csrfToken: request.csrfToken(),
        error: error,
        permisos: request.session.permisos || [],
    });
    console.log(request.session.username || 'hola')
};

exports.post_login = (request, response, next) => {
    Usuario.fetchOne(request.body.username)
    .then(([usuarios, fieldData]) => {
        console.log(usuarios[0]);
        if (usuarios.length == 1) {
            const usuario = usuarios[0];
            console.log(usuario.UserName)
                bcrypt.compare(request.body.password, usuario.Password)
                    .then((doMatch) => {
                        if(doMatch) {
                            Usuario.getPermisos(usuario.UserName)
                                .then(([rows, fieldData]) => {
                                    console.log(rows)
                                    request.session.funcion = rows;
                                    request.session.username = usuario.UserName;
                                    request.session.isLoggedIn = true;
                                    response.redirect('/');
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        } else {
                            request.session.error = "Usuario y/o contraseña incorrectos";
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

exports.get_signup = (request, response, next) => {
    const error = request.session.error || '';
    request.session.error = '';
    response.render('signup', {
        sername: request.session.username || '',
        registro: true,
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        error: error,
    });
};

exports.post_signup = (request, response, next) => {
    const nuevo_usuario = new Usuario(
        request.body.username, request.body.correo, request.body.nombre, request.body.password
    );
    nuevo_usuario.save()
        .then(() => {
            response.redirect('/usuario/login');
        })
        .catch((error) => {
            console.log(error);
            request.session.error = 'Nombre de usuario ya existe';
            response.redirect('/usuario/signup');
        });
};