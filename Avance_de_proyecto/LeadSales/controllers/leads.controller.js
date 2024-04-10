const { request } = require('express');

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
        csrfToken: request.csrfToken(),
    });
};

exports.get_leads = (request, res, next)  => {
    Lead.fetch(request.params.IDLead)
        .then(([rows,fieldData]) => {
            //console.log(NombreLead);
            console.log(rows.length); 
            res.render ('leads', {
                csrfToken: request.csrfToken(),
                registro: true,
                leads: rows,
                username: request.session.username || '',
                permisos: request.session.permisos || [],
            });
        })
        .catch((error) => {
            console.log(error);
        });

}

exports.post_eliminar_lead = (request, response, next) => {
    console.log('post-eliminar');
    Lead.eliminar(request.body.IDLead)
    .then(() => {
        return Lead.fetchAll();
        
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
