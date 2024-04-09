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
    Lead.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('historial', {
                registro: true,
                leads: rows,
                username: req.session.username || '',
                permisos: req.session.permisos || [],
            });
        })
        .catch((error) => {
            console.log(error);
        });
}

exports.get_leads = (req, res, next)  => {
    Lead.fetch(req.params.IDLead)
    .then(([rows,fieldData]) => {
        res.render ('leads', {
            registro: true,
            leads: rows,
            username: req.session.username || '',
            permisos: req.session.permisos || [],
        });
    })
    .catch((error) => {
        console.log(error);
    });

}