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
    });
};

exports.get_leads = (request, res, next)  => {
    Lead.fetch(request.params.IDLead)
        .then(([rows,fieldData]) => {
            //console.log(NombreLead);
            console.log(rows.length); 
            res.render ('leads', {
                csrfToken: request.csrfToken,
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


exports.get_modificar_lead = (request, response, next) => {
    const id = request.params.id;
    Lead.fetchOneLeadbyid(id)
    .then(([rows, fieldData]) => {
        response.json(rows[0]);
    })
    .catch((error) => {
        console.log(error);
    });
}


exports.post_modificar_lead = async (request, response, next) => {
    console.log('post-modificar');
    try {
        // Actualiza el lead en la base de datos
        await Lead.update(request.body);

        // Envía una respuesta al cliente indicando que la operación fue exitosa
        return response.status(200).json({ message: 'Lead actualizado con éxito' });
    } catch (error) {
        // Maneja cualquier error que pueda ocurrir
        console.error(error);
        return response.status(500).json({ message: 'Hubo un error al actualizar el lead' });
    }
};