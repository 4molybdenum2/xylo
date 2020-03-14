const express = require('express');
const mysql = require('mysql');
const router = express.Router();

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

// Create Database
// router.get('/database',(req,res)=>{
//     var sql = 'CREATE DATABASE webkriti2020';
//     connection.query(sql , (err,result)=>{
//         if(err) throw err;
//         console.log('result');
//         res.send('Database created');
//     });
// });

module.exports = connection;
// module.exports = router;