const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const connection = require("../db/db");

router.get("/admin", (req, res) => {
  res.send("Welcome to the admin page");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const { name, mail, pass, pass2 } = req.body;
  var e = [];

  if (!name || !mail || !pass || !pass2)
    e.push({ msg: "Please enter all the fields" });

  if (pass != pass2) e.push({ msg: "Passwords do not match" });

  if (pass.length < 6) e.push({ msg: "Weak Password" });

  connection.query("select * from users where email=?", [mail], (er, row) => {
    if (er) res.status(500).send(er);
    if (row.length) e.push("Account already exists");
    if(e.length){
        res.statusCode = 400;
        res.send(e);
    }else{
        const passwordHash = bcrypt.hashSync(pass, 10);
        var query = 'insert into users (name, email, password_hash) values ?';
        const val = [[name, mail, passwordHash]];
        connection.query(query, [val], err => {
            if(err) res.status(500).send(err);
        });
        res.status(200).send("registered");
    }
  });
});

router.post("/login", (req, res) => {
    const {mail, pass} = req.body;
    connection.query("select * from users where email = ?", [mail], (e, row) => {
        if(e) res.status(500).send(e);
        if(row.length){
            const user = row[0];
            if(bcrypt.compareSync(pass, user.passwordHash))
                res.redirect('/');
            else
                res.status(400).send("incorrect password");
        }else
            res.status(400).send("No record");
    });
});

module.exports = router;
