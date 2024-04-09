const Rol = require('../models/rol.model');

exports.post_eliminar = (request, response, next) => {
    console.log(request.body.IDRol)
    Rol.delete(request.body.IDRol)
        .then(([rows,fieldData]) => {
            Console.log("Registro eliminado exitosamente")
            response.redirect ('/eliminar');
        }).catch((error) => {
            console.log(error)
            response.redirect ('/eliminar');
        })
};

exports.get_mostrarRoles = (req, res, next) => {
    Rol.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('EliminarRol', {
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
