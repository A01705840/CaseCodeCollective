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

exports.post_privilegios = function(req, res, next) {
    console.log("post_privilegios");
    var changes = req.body;
    var promises = [];
    console.log(changes);
    
    // Primero, elimina todos los privilegios existentes para cada rol.
    var roles = [...new Set(changes.map(change => change.role))];
    console.log("eliminando privilegios de los roles:");
    console.log(changes.map(change => change.role));
    roles.forEach(function(role) {
        promises.push(privilegios.eliminarPrivilegios(role));
    });

    // Luego, inserta los nuevos privilegios.
    changes.forEach(function(change) {
        console.log("insertando privilegio:");
        console.log();
        if (change.checked) {
            console.log(change.role);
            promises.push(privilegios.insertarPrivilegio(change.role, change.privilege));
        }
    });

    Promise.all(promises)
        .then(() => {
            res.json({ message: 'Cambios guardados' });
        })
        .catch((error) => {
            console.error('Error:', error);
            res.status(500).json({ message: 'Error al guardar los cambios' });
        });
};