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
    console.log(req.body);
    res.redirect('/');
};