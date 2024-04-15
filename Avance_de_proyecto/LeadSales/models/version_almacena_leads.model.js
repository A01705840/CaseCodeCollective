const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class version_almacena_leads {
    constructor(mi_idVersion, mi_IDLead, mi_FechaVersionAlmacenaLead ) {
        this.IDVersion = mi_idVersion;
        this.IDLead = mi_IDLead;
        this.FechaVersionAlmacenaLead  = mi_FechaVersionAlmacenaLead ;
    }

    save() {
        return new Date(mi_fecha)
        .then((password_cifrado) => {
            return db.execute(
            `INSERT INTO version_almacena_leads (IDVersion, IDLead, FechaVersionAlmacenaLead) 
                VALUES (?, ?, ?)`,
            [this.IDVersion, this.IDLead, this.FechaVersionAlmacenaLead]);
        })
        .catch((error) => {
            console.log(error);
        });

    }
    static guardar_nuevo() {
    return db.execute(
        `INSERT INTO version_almacena_leads (IDVersion, IDLead, FechaVersionAlmacenaLead) 
        SELECT (SELECT MAX(IDVersion) FROM version), (SELECT MAX(IDLead) FROM leads), CURRENT_TIMESTAMP;`);
    }
    static async guardar_nuevo_p(mi_idLead) {
        return db.execute(
            `INSERT INTO version_almacena_leads (IDVersion, IDLead, FechaVersionAlmacenaLead) 
            SELECT (SELECT MAX(IDVersion) FROM version), ?, CURRENT_TIMESTAMP;`,
            [mi_idLead]
        );
    }
}