const { request } = require('express');

const Lead = require('../models/lead.model');
const Privilegio = require('../models/privilegios.model')
const Usuario = require('../models/usuario.model');
const Rol = require('../models/rol.model')

exports.get_analitica = (request, response, next) => {
    const error = request.session.error || '';
    request.session.error = '';
    Usuario.fetchOne(request.session.username)
    .then(([usuarios, fieldData]) => {
    const usuario = usuarios[0];
        console.log(usuario.UserName)
        Usuario.getPermisos(usuario.UserName)
            .then(([funciones, fieldData]) => {
                console.log('FUNCION HERE')
                console.log(funciones)
                request.session.funcion = funciones;
                request.session.username = usuario.Nombre;
                request.session.isLoggedIn = true;
                Lead.fetch(request.params.NombreLead)
                .then(([rows,fieldData]) => {
                    //console.log(NombreLead);
                    console.log(request.session.username || 'dfsdf')
                    res.render ('analitica', {
                        funcion: request.params.funcion,
                        username: request.params.username,
                        csrfToken: request.csrfToken(),
                        registro: true,
                        leads: rows,
                        error: error
                    });
                    console.log('get-leads');
                })
                .catch((error) => {
                    console.log(error);
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }).catch((error) => {
        console.log(error);
    });
};
exports.get_root = (request, response, next) => {
    Lead.fetchAll()
    Privilegio.fetchAll()
    Usuario.fetchAll()
    Rol.fetchAll()
    .then(() => {
        response.render('home', {
            username: request.session.username || '',
            registro: false,
            csrfToken: request.csrfToken(),
        });
    })
    .catch((error) => {
        console.log(error);
    });
};

exports.get_leads = (request, res, next)  => {
    const error = request.session.error || '';
    request.session.error = '';
    Usuario.fetchOne(request.session.username)
    .then(([usuarios, fieldData]) => {
        const usuario = usuarios[0];
        console.log(usuario.UserName)
        Usuario.getPermisos(usuario.UserName)
            .then(([funciones, fieldData]) => {
                console.log('FUNCION HERE')
                console.log(funciones)
                request.session.funcion = funciones;
                request.session.username = usuario.Nombre;
                request.session.isLoggedIn = true;
                Lead.fetch(request.params.NombreLead)
                .then(([rows,fieldData]) => {
                    //console.log(NombreLead);
                    console.log(request.session.username || 'dfsdf')
                    res.render ('leads', {
                        funcion: request.params.funcion,
                        username: request.params.username,
                        csrfToken: request.csrfToken(),
                        registro: true,
                        leads: rows,
                        error: error
                    });
                    console.log('get-leads');
                })
                .catch((error) => {
                    console.log(error);
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }).catch((error) => {
        console.log(error);
    })

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
