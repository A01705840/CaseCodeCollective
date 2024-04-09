const mysql = require('mysql2');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'leadsalesdb1',
    password: '',
});
module.exports = pool.promise();