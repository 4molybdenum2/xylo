const mysql = require('mysql');

const connection = mysql.createConnection(
    {
        host:'localhost',
        user:'webkriti',
        password:'Web_2020',
        database:'webkriti2020'
    }
);

connection.connect((err)=>{
        if(err) throw err;
        console.log('Database Connected');
    }
);

module.exports = connection;

