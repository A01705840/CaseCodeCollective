const Version = require('../models/version.model');
const csv = require('fast-csv');
const fs = require('fs');

exports.get_historial = (request, res, next) => {
    console.log('GET HISTORIAL')
    Version.fetch(request.params.IDVersion)
    Version.fetch(request.params.IDUser)
        .then(([rows, fieldData]) => {
            console.log(rows.length);
            res.render('historial', {
                csrfToken: request.csrfToken,
                registro: true,
                versiones: rows,
                username: request.session.username || '',
                permisos: request.session.permisos || [],
            });
        })
        .catch((error) => {
            console.log(error);
        });
}

exports.post_historial = (request, res, next) => {
    console.log(request.body);
    console.log(request.file);

    const fileRows = [];
    csv.parseFile(request.file.path)
    .on("data", function (data) {
      fileRows.push(data); // push each row
    })
    .on("end", function () {
      console.log(fileRows)
      fs.unlinkSync(request.file.path);   // remove temp file
      //process "fileRows" and respond
    })

    res.redirect('/lead/historial');

};
