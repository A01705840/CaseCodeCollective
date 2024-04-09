const Lead = require('../models/lead.model');

exports.get_analitica = (request, response, next) => {
    response.render('index', {
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

exports.get_leads = (req, res, next)  => {
    Lead.fetch(req.params.IDLead)
        .then(([rows,fieldData]) => {
            //console.log(NombreLead);
            console.log(rows.length); 
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

exports.post_eliminar = (req, res, next) => {
    console.log('post-eliminar');
    Lead.delete(request.body.IDLead)
    .then(() => {
        return Lead.fetchAll();

    }).then(([leads, fieldData]) => {
        return response.status(200).json({leads: leads});
    }).catch((error) => {
        console.log(error);
    });
}