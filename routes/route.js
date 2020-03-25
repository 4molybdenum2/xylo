const express = require("express");
const router = express.Router();
const connection = require("../db/db");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/stories", (req, res) => {
  res.redirect("/stories/0");
});

router.get("/stories/:id", (req, res) => {
  var sql = "SELECT * FROM posts";
  connection.query(sql, (err, rows) => {
    if (err) throw err;
    else {
      var urlid = req.params.id;
      if (urlid > rows.length - 1) {
        // TODO: Error 404 Implementation -> on errorpage.ejs
        res.render("errorPage", { errorCode: 404 });
      } else {
        obj = { print: [rows[urlid]] };
        fx = obj.print[0].fileurl;
        fileurl =
          "https://drive.google.com/uc?id=" +
          fx.slice(fx.search("d/") + 2, fx.search("/view"));

        var comment = [];
        connection.query(
          "SELECT person_name, content FROM comments WHERE post_id = " +
            connection.escape(obj.print[0].id),
          (e, result) => {
            if (e) throw e;
            if (result.length){
              result.forEach(element => {
                comment.push(element);
              });

              res.render("stories", {
                obj: obj,
                fileurl: fileurl,
                uid: req.session.userId,
                comment: comment
              });
            }else{
              res.render("stories", {
                obj: obj,
                fileurl: fileurl,
                uid: req.session.userId,
                comment: []
              });
            }
          }
        );
      }
    }
  });
});

router.post("/stories/:id", (req, res) => {
  const txt = req.body.content;
  if (!txt || !req.session.userId) res.status(400).send("Invalid Input");

  let query = "insert into comments set ?";
  let val = {content: txt, person_name: req.session.userName, post_id: parseInt(req.body.post_id)};
  connection.query(query, val, err => {
    if (err) res.status(500).render("errorPage", { error: err.sqlMessage, errorCode: 500 });
    else res.redirect("/stories/"+req.params.id);
  });
});

module.exports = router;
