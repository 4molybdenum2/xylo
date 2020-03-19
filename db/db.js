const mysql = require('mysql');

// TODO: New user mysql -> https://www.digitalocean.com/community/tutorials/how-to-create-a-new-user-and-grant-permissions-in-mysql
const connection = mysql.createConnection(
    {
        host:'us-cdbr-iron-east-04.cleardb.net',
        user:'bed860ac3797ea',
        password:'cc3737ee',
        database:'heroku_a279c24bfd19cf6'
    }
);

connection.connect((err)=>{
        if(err) throw err;
        console.log('Database Connected');
    }
);

module.exports = connection;

