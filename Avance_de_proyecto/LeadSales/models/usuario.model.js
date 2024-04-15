const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class Usuario {
    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(mi_username, mi_correo, mi_nombre, mi_password) {
        this.username = mi_username;
        this.correo = mi_correo;
        this.nombre = mi_nombre;
        this.password = mi_password;
    }
    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return bcrypt.hash(this.password, 12)
        .then((password_cifrado) => {
            return db.execute(
            `INSERT INTO usuario (UserName, Correo, Nombre, Password) 
            VALUES (?, ?, ?, ?)`, 
            [this.username, this.correo, this.nombre, password_cifrado])
            .then(() => {
                return db.execute(
                    `CALL rol_default(UserName, IDRol, FechaUsuarioRol,FechaUsuarioRolActualizacion)
                    VALUES (?, ?, ?, ?)`, 
                    [this.username, 3, NOW(), NOW()])
            })
            .catch((error) => {
                console.log(error);
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }
    static fetchOne(username) {
        return db.execute('Select * from usuario WHERE UserName = ?', [username]);
    }
    
    static getPermisos(username) {
        return db.execute(`
            SELECT f.Descripcion
            FROM funcion f, rol_adquiere_funcion r_a_f, rol r, usuario_tiene_rol u_t_r, usuario u
            WHERE u.UserName = ? AND u.IDUsuario = u_t_r.IDUsuario AND
            u_t_r.IDRol = r.IDRol AND r.IDRol = r_a_f.IDRol AND r_a_f.IDFuncion= f.IDFuncion
        `, [username]);
    }
}