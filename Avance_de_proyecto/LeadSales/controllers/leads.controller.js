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
    // console.log(req);
    try {

        //7 DAY
        const nDays = 7;
        const dateActual = new Date(Date.now());
        const milisecondsInDay = 24 * 60 * 60 * 1000 ;
        const newDate = dateActual - (nDays * milisecondsInDay)

        const data = {
            fechaActual: new Date(Date.now()),
            fechaAnterior: new Date(newDate)
        };
        console.log(data);

        // Get leads data for 7 days
        Lead.fetchByDate(data)
            .then(leadsData => {
                const leads = leadsData[0];

                // Group data by day and calculate total per day for 7 days
                const groupedData7Days = leads.reduce(function(acc, curr) {
                    const fecha = new Date(curr.FechaPrimerMensaje).toISOString().split('T')[0];
                    if (!acc[fecha]) {
                        acc[fecha] = 0;
                    }
                    acc[fecha] += curr.SUMA_IDLead;
                    return acc;
                }, {});

                // Calculate total and average per day for 7 days
                const total7Days = Object.values(groupedData7Days).reduce((acc, curr) => acc + curr, 0);
                const upDown7Days = total7Days / Object.keys(groupedData7Days).length;

                // Fetch leads data for 30 days, 185 days, and 365 days
                const nDaysArray = [30, 185, 365];
                const promises = nDaysArray.map(numDays => {
                    const newDate = dateActual - (numDays * milisecondsInDay);
                    const data = {
                        fechaActual: new Date(Date.now()),
                        fechaAnterior: new Date(newDate)
                    };
                    return Lead.fetchByDate(data);
                });

                Promise.all(promises)
                    .then(results => {
                        const formattedData = {
                            dates: {
                                today: {
                                    total: total7Days,
                                    upDown: upDown7Days,
                                    data: {
                                        labels: Object.keys(groupedData7Days),
                                        income: Object.values(groupedData7Days)
                                    }
                                },
                                "7days": {
                                    total: 0,
                                    upDown: 0,
                                    data: {
                                        labels: [],
                                        income: []
                                    }
                                },
                                "30days": {
                                    total: 0,
                                    upDown: 0,
                                    data: {
                                        labels: [],
                                        income: []
                                    }
                                },
                                "6months": {
                                    total: 0,
                                    upDown: 0,
                                    data: {
                                        labels: [],
                                        income: []
                                    }
                                },
                                "year": {
                                    total: 0,
                                    upDown: 0,
                                    data: {
                                        labels: [],
                                        income: []
                                    }
                                }
                            }
                        };

                        // Populate data for 30 days, 185 days, and 365 days
                        results.forEach((leadsData, index) => {
                            const leads = leadsData[0];
                            const numDays = nDaysArray[index];
                            const groupedData = leads.reduce(function(acc, curr) {
                                const fecha = new Date(curr.FechaPrimerMensaje).toISOString().split('T')[0];
                                if (!acc[fecha]) {
                                    acc[fecha] = 0;
                                }
                                acc[fecha] += curr.SUMA_IDLead;
                                return acc;
                            }, {});
                            const total = Object.values(groupedData).reduce((acc, curr) => acc + curr, 0);
                            const upDown = total / Object.keys(groupedData).length;
                            formattedData.dates[`${numDays}days`] = {
                                total: total,
                                upDown: upDown,
                                data: {
                                    labels: Object.keys(groupedData),
                                    income: Object.values(groupedData)
                                }
                            };
                        });

                        const jsonString = JSON.stringify(formattedData);
                        console.log(jsonString);

                        //Linea para mostrar JSON EN LA FINAL (PRINCIPAL RUTA)
                        res.json(jsonString);
                        
                

                        // Send the structured data as response
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