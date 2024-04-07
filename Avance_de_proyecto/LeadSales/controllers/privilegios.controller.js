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

            // Calcular maxRoles
            let maxRoles = rolesUnicos.size;

            // Convertir rolesUnicos a un array e invertirlo
            let nombresRoles = Array.from(rolesUnicos).reverse();
            console.log(nombresRoles);
            // Renderizar la vista con el objeto funcionesRoles, maxRoles y nombresRoles
            res.render('privilegios', {
                username: req.session.username || '',
                funcionesRoles: funcionesRoles,
                maxRoles: maxRoles,
                nombresRoles: nombresRoles
            });
        })
        .catch(error => {
            next(error);
        });
};