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


exports.get_analitica = async (req, res) => {
    
    // Lead.fetch(1)
    //     .then(([data]) => {
    //         console.log(data);
    //         res.render('analitica', {
    //             registro: true,
    //             versiones: data,
    //             username: req.session.username || '',
    //             permisos: req.session.permisos || [],
               
    //         });
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
    // const nDays = req.body.nDays;
    const nDays = req.body.nDays;
    console.log(nDays);
    // const nDays = 70;

    const dateActual = new Date(Date.now());
    const milisecondsInDay = 24 * 60 * 60 * 1000;
    const newDate = dateActual - ( nDays * milisecondsInDay )

    const data = {
        fechaActual : new Date(Date.now()),
        fechaAnterior : new Date(newDate)
    }
    console.log(data)
    const result = await Lead.fetchByDate(data);


    //manejar la informacion, uso de ejemplo
    const dataChart = result.map(entry => entry.SUMA_IDLead);
    // res.send(result [0]);
    res.send(dataChart);
};

exports.postAnalitica = async (req, res) => {
    try {
        const nDays = req.body.nDays; // Obtiene del cuerpo de la peticion, valor que haya en NDays
        const data = await Version.fetchByDate(nDays); // Espera a que se resuelva la promesa
        res.send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al obtener la analítica.");
    }
};