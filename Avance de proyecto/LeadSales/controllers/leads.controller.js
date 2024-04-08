const Lead = require('../models/lead.model');
const csv = require('fast-csv');
const fs = require('fs');


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
    Lead.fetch(req.params.IDVersion)
        .then(([rows, fieldData]) => {
            res.render('historial', {
                registro: true,
                versiones: rows,
                username: req.session.username || '',
                permisos: req.session.permisos || [],
            });
        })
        .catch((error) => {
            console.log(error);
        });
}

exports.post_historial = (req, res, next) => {
    console.log(req.body);
    console.log(req.file);

    const fileRows = [];
    csv.parseFile(req.file.path)
    .on("data", function (data) {
      fileRows.push(data); // push each row
    })
    .on("end", function () {
      console.log(fileRows)
      fs.unlinkSync(req.file.path);   // remove temp file
      //process "fileRows" and respond
    })

    res.redirect('/lead/historial');

};

exports.algo = (req, res, next) => {
    
    for(let i of conjunto)  {

        Modelo.getAlgo().then(([rows, fieldData]) => {

        })
    }

    res.redirect('/lead/historial');
};

exports.algo = async (req, res, next) => {
    
    for(let i of conjunto)  {
        try {
            [rows, fieldData] = await Modelo.getAlgo();
        } catch (error) {
            
        }
        
    }

    res.redirect('/lead/historial');
};