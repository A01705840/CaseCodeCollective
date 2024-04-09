const Rol = require('../models/rol.model');

exports.post_eliminar = (request, response, next) => {
    console.log(request.body.IDRol)
    Rol.delete(request.body.IDRol)
        .then(([rows,fieldData]) => {
            Console.log("Registro eliminado exitosamente")
            response.redirect ('/consultas');
        }).catch((error) => {
            console.log(error)
            response.redirect ('/consultas');
        })
};

exports.get_mostrarRoles = (req, res, next) => {
    Rol.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('Rol', {
                registro: true,
                rol: rows,
                username: req.session.username || '',
                permisos: req.session.permisos || [],
            });
        })
        .catch((error) => {
            console.log(error);
        });
}
