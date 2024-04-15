const mysql = require('mysql2');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'leadsalesdb2',
    password: '',
});
module.exports = pool.promise();