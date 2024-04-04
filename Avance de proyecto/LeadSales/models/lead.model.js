const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class Version {
    constructor(mi_idVersion, mi_iduser, mi_fecha, mi_nombreVersion) {
        this.IDVersion = mi_idVersion;
        this.IDUser = mi_iduser;
        this.FechaCreacion = mi_fecha;
        this.NombreVersion = mi_nombreVersion;
    }
}