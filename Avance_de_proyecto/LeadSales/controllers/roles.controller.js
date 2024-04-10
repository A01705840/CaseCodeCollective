const Rol = require('../models/rol.model');
const privilegios = require('../models/privilegios.model');

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
    privilegios.fetchFunciones()
        .then(data => {
            // Crear un objeto para almacenar las funciones
            let funciones = {};

            // Iterar sobre los datos y agregar cada funcion y su ID al objeto funciones
            data.forEach(item => {
                if (!funciones[item.Descripcion]) {
                    funciones[item.Descripcion] = {id: item.IDFuncion};
                }
            });

            // Renderizar la vista con los datos
            res.render('agregarRol', {
                funciones: funciones,
                username: req.session.username || '',
                permisos: req.session.permisos || [],
            });
        })
        .catch((error) => {
            console.log(error);
        });
};

exports.post_agregarRol = (req, res, next) => {
    //console.log(changes);
    Rol.agregarRol(req, res)
        .then(([rows, fieldData]) => {
            res.json({message: 'Rol creado exitosamente'});
        })
        .catch((error) => {
            console.error('Error:', error);
            res.status(500).json({ message: 'Error al crear el rol' });
        });
}