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
        comments = [];
        connection.query(
          "SELECT person_name, content FROM comments WHERE post_id = " +
            obj.print[0].id,
          (e, result) => {
            if (e) throw e;
            else
              for (let i = 0; i < result.length; i++) comments.push(result[i]);
          }
        );

        fx = obj.print[0].fileurl;
        fileurl =
          "https://drive.google.com/uc?id=" +
          fx.slice(fx.search("d/") + 2, fx.search("/view"));
        res.render("stories", {
          obj: obj,
          fileurl: fileurl,
          comment: comments,
          uid: req.session.userId
        });
      }
    }
  });
});

router.post("/stories/:id", (req, res) => {
  const content = req.body.content;
  if (!content || !req.session.userId) res.status(400).send("Invalid Input");

  let query = "insert into comments (content, person_name, post_id) values(?,?,?)";
  let val = [content, req.session.name, parseInt(req.body.post_id)];
  connection.query(query, val, err => {
    if (err) res.status(500).render("errorPage", { error: err.sqlMessage, errorCode: 500 });
    else res.redirect("/stories");
  });
});

module.exports = router;
