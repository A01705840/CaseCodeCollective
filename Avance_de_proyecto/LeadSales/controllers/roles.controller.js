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


exports.get_agregarRol = (req, res, next) => {
    // Aquí puedes obtener los datos que necesitas pasar a la vista
    // Por ejemplo, podrías obtener todos los privilegios disponibles para que el usuario pueda seleccionarlos al crear un nuevo rol

    Privilegio.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('ruta/a/tu/vista', {
                privilegios: rows,
                username: req.session.username || '',
                permisos: req.session.permisos || [],
            });
        })
        .catch((error) => {
            console.log(error);
        });
};