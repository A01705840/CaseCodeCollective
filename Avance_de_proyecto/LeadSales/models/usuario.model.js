const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class Usuario {
    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(mi_username, mi_correo, mi_nombre, mi_password) {
        this.UserName = mi_username;
        this.Correo = mi_correo;
        this.Nombre = mi_nombre;
        this.Password = mi_password;
    }
    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        console.log(this.UserName, this.Correo, this.Nombre, this.Password)
        return bcrypt.hash(this.Password, 12)
        .then(async(password_cifrado) => {
            try {
                await db.execute(
                `CALL registrar_usuario(?, ?, ?, ?)`, 
                [this.UserName, this.Correo, this.Nombre, password_cifrado]);
            
            return db.execute(
                'CALL rol_default(?, NOW(), NOW())', 
                [this.UserName]
                );
            }catch(error) {
            console.log(error);
        }
        });
    }
        static fetchOne(username) {
            return db.execute('Select * from usuario WHERE username = ?', [username]);
        }
            
        static getPermisos(username) {
        return db.execute(`
            SELECT f.Descripcion
            FROM funcion f, rol_adquiere_funcion r_a_f, rol r, usuario_tiene_rol u_t_r, usuario u
            WHERE u.username = ? AND u.IDUsuario = u_t_r.IDUsuario AND
            u_t_r.IDRol = r.IDRol AND r.IDRol = r_a_f.IDRol AND r_a_f.IDFuncion= f.IDFuncion
        `, [username]);
    }
}