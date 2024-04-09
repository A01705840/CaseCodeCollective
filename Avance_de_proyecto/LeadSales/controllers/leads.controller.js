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

exports.post_eliminar_lead = (req, res, next) => {
    console.log('post-eliminar');
    Lead.delete(request.body.IDLead)
    .then(() => {
        return Lead.fetchAll();
        console.log('Eliminado');

    }).then(([leads, fieldData]) => {
        return response.status(200).json({leads: leads});
    }).catch((error) => {
        console.log(error);
    });
}

exports.get_fechas = () => {
    console.log('');
    Lead
}

exports.postAnalitica = (req, res) => {
    const nDayss = req.body.nDays; // Obtiene del cuerpo de la peticion, valor que haya en NDays
    const data =  Lead.fetchByDate(nDayss);
    res.send(data);
};
