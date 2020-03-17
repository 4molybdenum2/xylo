const mysql = require('mysql');

// TODO: New user mysql -> https://www.digitalocean.com/community/tutorials/how-to-create-a-new-user-and-grant-permissions-in-mysql
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

