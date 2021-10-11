const mysql = require('mysql');

const connection = mysql.createPool(
    {
        connectionLimit: 5,
        host:'',
        user:'',
        password:'',
        database:'',
        typeCast: true,
    }
);

module.exports = connection; 