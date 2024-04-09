const Version = require('../models/version.model');
const Lead= require('../models/lead.model');
const Usuario= require('../models/usuario.model');

const csv = require('fast-csv');
const fs = require('fs');
const { fileLoader } = require('ejs');

exports.get_historial = (req, res, next) => {
    Version.fetch(req.params.IDVersion)
    Version.fetch(req.params.IDUser)
        .then(([rows, fieldData]) => {
            console.log(rows.length);
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

exports.post_historial = async (req, res, next) => {
    console.log(req.body);
    console.log(req.file);

    let fileRows = [];
    let fila = 0;
    try {
    await  csv.parseFile(req.file.path)
        .on("data", function (data) {
           if(fila>0){
            fileRows.push(data); // push each row
            fileRows=fileRows.pop();
            console.log("Asignado a "+fileRows[17]);
            Usuario.guardar_nuevo(fileRows[17]).then(() => {
                // Éxito al guardar el nuevo usuario
            }).catch(error => {
                console.log(error);
            });
           } 
           else{
            fila++
           }
        })
        .on("end", function () {
            console.log(fileRows);
            fs.unlinkSync(req.file.path); 
        })
    } catch (error) {
        console.log(error);
    }
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