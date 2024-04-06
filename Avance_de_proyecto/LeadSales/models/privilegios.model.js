const db = require('../util/database');
const bcrypt = require('bcryptjs');


module.exports = class Privilegios {
    constructor(mi_idfuncion, mi_idrol) {
        this.idfuncion = mi_idfuncion;
        this.idrol = mi_idrol;
    }

    static fetchAll() {
        return db.execute(`
            SELECT r.IDRol, r.IDFuncion, f.Descripcion, ro.TipoRol
            FROM rol_adquiere_funcion r
            JOIN funcion f ON r.IDFuncion = f.IDFuncion
            JOIN rol ro ON r.IDRol = ro.IDRol
        `)
        .then(([data]) => {
            console.log(data);
            return data;
        });
    }
}