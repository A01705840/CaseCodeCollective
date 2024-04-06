const privilegios = require('../models/privilegios.model');

exports.get_privilegios = (req, res, next) => {
    privilegios.fetchAll()
        .then(data => {
            // Crear un objeto para almacenar las funciones y roles
            let funcionesRoles = {};
            let rolesUnicos = new Set();

            // Iterar sobre los datos y agregar cada funcion y rol al objeto
            data.forEach(item => {
                if (!funcionesRoles[item.Descripcion]) {
                    funcionesRoles[item.Descripcion] = [];
                }
                funcionesRoles[item.Descripcion].push(item.TipoRol);
                rolesUnicos.add(item.TipoRol);
            });
            console.log(funcionesRoles);

            // Calcular maxRoles
            let maxRoles = rolesUnicos.size;
            console.log(maxRoles);


            // Renderizar la vista con el objeto funcionesRoles y maxRoles
            res.render('privilegios', {
                username: req.session.username || '',
                funcionesRoles: funcionesRoles,
                maxRoles: maxRoles
            });
        })
        .catch(error => {
            next(error);
        });
};