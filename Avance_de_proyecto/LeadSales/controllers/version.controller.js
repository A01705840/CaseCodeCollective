const Version = require('../models/version.model');
const Lead= require('../models/lead.model');
const Usuario= require('../models/usuario.model');

const csv = require('fast-csv');
const fs = require('fs');
const { fileLoader } = require('ejs');


function convertirFecha(fecha) {
    // Dividir la fecha en día, mes y año
    var partes = fecha.split('/');
    var dia = partes[0];
    var mes = partes[1];
    var año = partes[2];

    // Agregar ceros iniciales si el día o el mes tienen un solo dígito
    if (dia.length === 1) {
        dia = '0' + dia;
    }
    if (mes.length === 1) {
        mes = '0' + mes;
    }

    // Devolver la fecha en el nuevo formato
    return año + '-' + mes + '-' + dia;
}

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
    let fileRows = [];
    let fila = 0;
    try {
        csv.parseFile(req.file.path)
            .on("data",async function (data) {
                if (fila > 0) {
                    try {
                        fileRows.push(data); 
                        let rowData =fileRows.pop();
                        if(rowData[21]=="TRUE"){
                            rowData[21]=1;
                        }
                        if(rowData[21]=="FALSE"){
                            rowData[21]=0;
                        }if(rowData[20]=="Si"){
                            rowData[20]=1;
                        }
                        if(rowData[20]=="No"){
                            rowData[20]=0;
                        }
                        rowData[9] = convertirFecha(rowData[9]);
                        await Usuario.guardar_nuevo(rowData[17]);
                        await Lead.guardar_nuevo(rowData[17], rowData[0], rowData[1], rowData[9], rowData[18], rowData[19], rowData[15], rowData[20], rowData[21]);
                    } catch (error) {
                        console.log(error);
                }    
                }
                fila++;
            })
            .on("end", async function () {
                fs.unlinkSync(req.file.path);
                console.log("Registros guardados exitosamente");
            });
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