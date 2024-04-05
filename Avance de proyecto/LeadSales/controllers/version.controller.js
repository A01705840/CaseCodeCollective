const Version = require('../models/version.model');

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