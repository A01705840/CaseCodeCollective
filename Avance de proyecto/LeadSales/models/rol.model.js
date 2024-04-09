const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class Rol {
    constructor(mi_idRol, mi_TipoRol) {
        this.IDRol = mi_idRol;
        this.TipoRol = mi_TipoRol;

    }

    save() {
        return toString(this.Embudo)
        .then((IDRol) => {
            return db.execute(
            `INSERT INTO rol (IDRol, TipoRol) 
                VALUES (?, ?)`,
            [this.IDRol, this.TipoRol]);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    
    static delete(id) {
        return db.execute('DELETE FROM rol_adquiere_funcion WHERE IDRol = ? ', [id]),db.execute('DELETE FROM usuario_tiene_rol WHERE IDRol = ? ', [id])
        .then(()=>{
            return  db.execute('DELETE FROM rol WHERE IDRol = ? ', [id])
        })
        .catch((error => {
            console.log (error)
            throw Error ('Rol no encntrado')
        }));
    }


    static fetchAll() {
        return db.execute('Select * FROM rol')
    }
    static fetch(id) {
        if (id) {
            return this.fetchOne(id);
        } else {
            return this.fetchAll();
        }
    }
    
    
}