const mysql = require("mysql");

const connection = mysql.createPool({
  connectionLimit: 5,
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "xylo",
  typeCast: true,
});

module.exports = connection;
