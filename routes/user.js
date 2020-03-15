const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const connection = require("../db/db");

router.get("/admin", (req, res) => {
  res.send("Welcome to the admin page");
});

router.get("/login", (req, res) => {
  if(req.session.userId)
    res.status(401).send("Already logged in");
  else
    res.render("login");
});

router.get("/register", (req, res) => {
  if(req.session.user)
    res.status(401).send("Already logged on");
  else
    res.render("register", { length: 0 });
});

router.get("/dashboard", (req, res) => {
  if(req.session.userId)
    res.status(200).render("dashboard", { uid: req.session.userId });
  else
    res.status(401).render("login");
});

router.get("/logout", (req, res) => {
  if(req.session.userId){
    req.session.destroy(() => {
      res.status(200).redirect("/");
    });
  }else
    res.status(400).render("login");
});

router.get("*", (req, res) => {
  res.status(404).render("errorPage", {e404: true});
})

router.post("/register", (req, res) => {
  const { name, mail, pass, pass2 } = req.body;
  var e = [];

  if (!name || !mail || !pass || !pass2)
    e.push({ msg: "Please enter all the fields" });

  if (pass != pass2) e.push({ msg: "Passwords do not match" });
  if (pass.length < 6) e.push({ msg: "Weak Password" });

  connection.query("select * from users where email=?", [mail], (er, row) => {
    if (er) res.status(500).send(er);
    if (row.length)
      res.render("login", { exists: true });
    if(e.length){
      res.render("register", { errors: e, length: e.length });
    }else{
        const passwordHash = bcrypt.hashSync(pass, 10);
        var query = 'insert into users (name, email, password_hash) values ?';
        const val = [[name, mail, passwordHash]];
        connection.query(query, [val], err => {
            if(err) res.status(500).send(err);
        });

        res.status(200).render("/login", { email: mail });
    }
  });
});

router.post("/login", (req, res) => {
  const { mail, pass } = req.body;
  connection.query("select * from users where email=?", [mail], (e, row) => {
    if(e) res.status(500).send(e);
    if(row.length){
      const user = row[0];
      if(bcrypt.compareSync(pass, user.password_hash)){
        req.session.userId = user.id;
        res.redirect("/dashboard");
      }
      else
        res.status(400).send("Incorrect Password");      
    }else
      res.status(400).send("User not found");
  });
});

module.exports = router;
