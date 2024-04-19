const { request } = require('express');

const Lead = require('../models/lead.model');
const Usuario = require('../models/usuario.model');

exports.get_analitica = async (request, response, next) => {
    const range = request.params.date; // Obtener el rango de la ruta
    const result = await Lead.fetchLeadsByDay(range);
    const cantidadLeads = await Lead.obtenerCantidadLeads();
    const cantidadLeadsOrganicos = await Lead.obtenerCantidadLeadsOrganicos();
    console.log(result[0]);
    response.json({
        leadsPorDia: result[0],
        cantidadTotalLeads: cantidadLeads,
        cantidadLeadsOrganicos: cantidadLeadsOrganicos
    }); // Devolver los datos como JSON
};

exports.get_analiticaPRESET = async (request, response, next) => {
    const result = await Lead.fetchLeadsByDay('1'); // Siempre usa '1' (semana) como valor predeterminado
    const cantidadLeads = await Lead.obtenerCantidadLeads();
    const cantidadLeadsOrganicos = await Lead.obtenerCantidadLeadsOrganicos();
    console.log(result[0]);
    response.render('analitica', {
        username: request.session.username || '',
        leadsPerDay: result[0], // Resultado de la consulta SQL
        cantidadTotalLeads: cantidadLeads,
        cantidadLeadsOrganicos: cantidadLeadsOrganicos,
        registro: false,
    });
};

//

exports.get_root = (request, response, next) => {
    console.log('GET ROOT');
    console.log(request.session.username + request.session.isLoggedIn)
    response.render('home', {
        username: request.session.username || '',
        permisos: request.session.permisos || [],
    })
    .catch((error) => {
        console.log(error);
        
    });
};

exports.get_leads = (request, res, next)  => {
    console.log('GET LEADS');
    Lead.fetch(request.params.IDLead)
        .then(([rows,fieldData]) => {
            //console.log(NombreLead);
            //console.log(rows.length); 
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
    console.log('POST ELIMINAR LEAD');
    Lead.eliminar(request.body.IDLead)
    .then(() => {
        return Lead.fetchAll();
        
    }).then(([leads, fieldData]) => {
        return response.status(200).json({leads: leads});
    }).catch((error) => {
        console.log(error);
    });
    console.log('LEAD ELIMINADO');
}

exports.get_fechas = () => {
    console.log('GET FECHAS')
    console.log('');
    Lead
}



exports.get_modificar_lead = (request, response, next) => {
    console.log('GET MODIFICAR LEAD')
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
    console.log('POST MODIFICAR LEAD');
    try {
        // Actualiza el lead en la base de datos
        console.log(request.body);
        console.log(request.body);
        await Lead.update(request.body);

        // Envía una respuesta al cliente indicando que la operación fue exitosa
        return response.status(200).json({ message: 'Lead actualizado con éxito' });
    } catch (error) {
        // Maneja cualquier error que pueda ocurrir
        console.error(error);
        return response.status(500).json({ message: 'Hubo un error al actualizar el lead' });
    }
};