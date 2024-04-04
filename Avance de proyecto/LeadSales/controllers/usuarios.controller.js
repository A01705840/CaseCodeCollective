const Usuario = require('../models/usuario.model');

exports.get_login = (request, response, next) => {
    response.render('login', {
        username: request.session.username || '',
        registro: false,
    });
};

exports.get_signup = (req, res, next) => {
    res.render('signup', {
        //username: req.session.username || '',
        registro: false,
    });
};

exports.post_signup = (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
};