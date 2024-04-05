const Lead = require('../models/lead.model');

exports.get_analitica = (request, response, next) => {
    response.render('analitica', {
        username: request.session.username || '',
        registro: false,
    });
};
exports.get_root = (request, response, next) => {
    response.render('home', {
        username: request.session.username || '',
        registro: false,
    });
};

exports.get_historial = (req, res, next) => {
    Lead.fetch(req.params.IDVersion)
        .then(([rows, fieldData]) => {
            res.render('historial', {
                registro: true,
                versiones: rows,
                username: req.session.username || '',
                permisos: req.session.permisos || [],
            });
        })
        .catch((error) => {
            console.log(error);
        });
}