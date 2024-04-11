const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class Version {
    constructor(mi_idVersion, mi_idusuario, mi_fechacreacion, mi_nombreVersion) {
        this.IDVersion = mi_idVersion;
        this.IDUsuario = mi_idusuario;
        this.FechaCreacion = mi_fechacreacion;
        this.NombreVersion = mi_nombreVersion;
        
    }

    save() {
        return new Date(this.fecha)
        .then((password_cifrado) => {
            return db.execute(
                // Exactly as the table looks
            `INSERT INTO version (IDVersion, IDUsuario, FechaCreacion, NombreVersion) 
                VALUES (?, ?, ?, ?)`,
            [this.IDVersion, this.IDUsuario, this.FechaCreacion, this.NombreVersion]);
        })
        .catch((error) => {
            console.log(error);
        });

    }
        static fetchAll() {
            return db.execute('Select * from version')
        }
        static fetch(id) {
            if (id) {
                return this.fetchOne(id);
            } else {
                return this.fetchAll();
            }
        }
        static fetchOne(IDVersion) {
            return db.execute('Select * from version WHERE IDVersion = ?', [IDVersion]);
    }
}