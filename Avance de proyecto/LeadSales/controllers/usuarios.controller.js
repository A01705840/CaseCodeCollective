const Usuario = require('../models/usuario.model');

exports.get_login = (request, response, next) => {
    response.render('login', {
        username: request.session.username || '',
        registro: false,
    });
};
