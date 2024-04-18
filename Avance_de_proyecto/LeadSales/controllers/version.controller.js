const Version = require('../models/version.model');
const Version_almacena_leads = require('../models/version_almacena_leads.model');
const Lead= require('../models/lead.model');
const Usuario= require('../models/usuario.model');

const csv = require('fast-csv');
const fs = require('fs');
const { fileLoader } = require('ejs');
const { version } = require('os');
const multer = require('multer');
const { todo } = require('node:test');


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

exports.get_historial = async (req, res, next) => {
    Version.fetch(req.params.IDVersion)
    Version.fetch(req.params.IDUser)
        .then(([rows, fieldData]) => {
            res.render('historial', {
                registro: true,
                versiones: rows,
                username: req.session.username || '',
                permisos: req.session.permisos || [],
                FileTypeError: false,
                Succes: false,
                FormatTypeError: false,
            });
        })
        .catch((error) => {
            console.log(error);
        });
}

exports.post_historial = async (req, res, next) => {
    let fila = 0;
    let posiciones;
    if (req.file.mimetype == 'text/csv') {
        await Version.guardar_nuevo(1, "Version");
        csv.parseFile(req.file.path)
            .on("data", async function (rowData) {
                if (fila > 0) {
                    try {
                        if (rowData[posiciones[8]] === "TRUE") {
                            rowData[posiciones[8]] = 1;
                        } else if (rowData[posiciones[8]] === "FALSE") {
                            rowData[posiciones[8]] = 0;
                        } else if (rowData[posiciones[7]] === "Si") {
                            rowData[posiciones[7]] = 1;
                        } else if (rowData[7] === "No") {
                            rowData[posiciones[7]] = 0;
                        }
                        rowData[posiciones[3]] = convertirFecha(rowData[posiciones[3]]);
                        // Ejecutar ambas consultas y esperar a que se completen
                        const [usuarioResult, leadResult] =await Promise.all([
                            Usuario.guardar_nuevo(rowData[posiciones[0]]),
                            Lead.guardar_nuevo(rowData[posiciones[0]], rowData[posiciones[1]], rowData[posiciones[2]], rowData[posiciones[3]], rowData[posiciones[4]], rowData[posiciones[5]], rowData[posiciones[6]], rowData[posiciones[7]], rowData[posiciones[8]]),
                        ]);
                    } catch (error) {
                        console.log(error);
                    }
                }
                else{
                    const todosPresentes = ['Asignado a','Teléfono','Nombre','Fecha de primer mensaje','Embudo', 'Etapa', 'Status', 'Archivado', 'Creado Manualmente'].every(elemento => rowData.includes(elemento));
                    const elementosBuscados = ['Asignado a','Teléfono','Nombre','Fecha de primer mensaje','Embudo', 'Etapa', 'Status', 'Archivado', 'Creado Manualmente'];
                    if(!todosPresentes){
                        Version.fetch(req.params.IDVersion)
                        Version.fetch(req.params.IDUser)
                            .then(([rows, fieldData]) => {
                                console.log(rows.length);
                                res.render('historial', {
                                    registro: true,
                                    versiones: rows,
                                    username: req.session.username || '',
                                    permisos: req.session.permisos || [],
                                    FileTypeError: false,
                                    Succes: false,
                                    FormatTypeError: true,
                                });
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    }
                    fila++;
                    posiciones = elementosBuscados.map(elemento => rowData.indexOf(elemento));
                }
            })
            .on("end", async function () {
                fs.unlinkSync(req.file.path);
                console.log("Registros guardados exitosamente");
                Version.fetch(req.params.IDVersion)
                Version.fetch(req.params.IDUser)
                    .then(([rows, fieldData]) => {
                        console.log(rows.length);
                        res.render('historial', {
                            registro: true,
                            versiones: rows,
                            username: req.session.username || '',
                            permisos: req.session.permisos || [],
                            FileTypeError: false,
                            Succes: true,
                            FormatTypeError: false,
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .on("error", function (error) {
                console.log(error);
                fs.unlinkSync(req.file.path);
                res.redirect('/lead/historial');
            });
    } 
    else {
        console.error('Se intentó subir un archivo con un tipo MIME incorrecto:', req.file.originalname);
        fs.unlinkSync(req.file.path);
        Version.fetch(req.params.IDVersion)
        Version.fetch(req.params.IDUser)
            .then(([rows, fieldData]) => {
                console.log(rows.length);
                res.render('historial', {
                    registro: true,
                    versiones: rows,
                    username: req.session.username || '',
                    permisos: req.session.permisos || [],
                    FileTypeError: true,
                    Succes: false,
                    FormatTypeError: false,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
};