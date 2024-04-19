const mysql = require("mysql2");
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
<<<<<<< HEAD
    database: 'leadsalesdb3',
=======
    database: 'leadsalesdb',
>>>>>>> a5003f70847e10431f62d915a4a528e66dd35ab5
    password: '',
});
module.exports = pool.promise();
