const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class Usuario {
    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(mi_username, mi_nombre, mi_password, mi_correo) {
        this.username = mi_username;
        this.nombre = mi_nombre;
        this.password = mi_password;
        this.correo = mi_correo;
    }
    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return bcrypt.hash(this.password, 12)
        .then((password_cifrado) => {
            return db.execute(
            `INSERT INTO usuario (username, nombre, password, correo) 
            VALUES (?, ?, ?, ?)`, 
            [this.username, this.nombre, password_cifrado, this.correo]);
        })
        .catch((error) => {
            console.log(error);
        });
    }
       static fetchOne(username) {
        return db.execute('Select * from usuario WHERE username = ?', [username]);
    }

    static fetchAll() {
        return db.execute('SELECT * FROM usuario');
    }

    static eliminar_usuario(id) {
        return db.execute('DELETE FROM usuario WHERE IDUsuario = ?', [id]);
    }

    static establecer_rol(IDRoles,idUsuario) {
        //const fechaCreate = date.now();
        return db.execute('INSERT INTO `usuario_tiene_rol` (`IDUsuario`, `IDRol`, `FechaUsuarioRol`, `FechaUsuarioRolActualizacion`) VALUES (?, ?, CURRENT_DATE(), CURRENT_DATE());', [IDRoles, idUsuario]);
        
    }

    static fetchOneID(username) {
        return db.execute('Select IDUsuario from usuario WHERE username = ?', [username]);
    }
}