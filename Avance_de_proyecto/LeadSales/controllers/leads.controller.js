const Lead = require('../models/lead.model');

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


exports.get_analitica = (req, res) => {
    try {
        const nDays = 365;
        const dateActual = new Date(Date.now());
        const milisecondsInDay = 24 * 60 * 60 * 1000;
        const newDate = dateActual - (nDays * milisecondsInDay)

        const data = {
            fechaActual: new Date(Date.now()),
            fechaAnterior: new Date(newDate)
        };
        console.log(data);
        
        // Obtener los datos de los leads
        Lead.fetchByDate(data)
            .then(leadsData => {
                // Manejar los datos de los leads
                const leads = leadsData[0];

                // Agrupar los datos por día y calcular el total por día
                const groupedData = leads.reduce(function(acc, curr) {
                    const fecha = new Date(curr.FechaPrimerMensaje).toISOString().split('T')[0];
                    if (!acc[fecha]) {
                        acc[fecha] = 0;
                    }
                    acc[fecha] += curr.SUMA_IDLead;
                    return acc;
                }, {});

                // Calcular el total y el promedio diario
                const total = Object.values(groupedData).reduce((acc, curr) => acc + curr, 0);
                const upDown = total / Object.keys(groupedData).length;

                // Estructurar los datos en el formato deseado
                const formattedData = {
                    dates: {
                        today: {
                            total: total,
                            upDown: upDown,
                            data: {
                                labels: Object.keys(groupedData),
                                income: Object.values(groupedData)
                            }
                        }
                        // Puedes agregar más períodos de tiempo aquí si lo deseas
                    }
                };
                const jsonString = JSON.stringify(formattedData);
                //console.log(jsonString)
                // Enviar los datos estructurados como respuesta
                
                res.render('analitica', {
                    registro: true,
                    datosformateados: jsonString,
                    username: req.session.username || '',
                    permisos: req.session.permisos || [],
                });
            })
            .catch(error => {
                console.log(error);
                res.status(500).send("Error al obtener la analítica.");
            });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al obtener la analítica.");
    }
};


// exports.postAnalitica = async (req, res) => {
//    try {
//        const nDays = req.body.nDays; // Obtiene del cuerpo de la peticion, valor que haya en NDays
//        const data = await Version.fetchByDate(nDays); // Espera a que se resuelva la promesa
//         res.send(data);
//     } catch (error) {
//        console.log(error);
//         res.status(500).send("Error al obtener la analítica.");
//     }
// };