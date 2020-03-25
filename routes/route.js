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
  const comment = req.body.comment_text;
  const id = req.params.id;
  const name = req.session.userName;

  if (!comment || !name) res.status(400).send("Invalid Input");

  var query = "insert into comments values ?";
  const upData = [[comment, name, parseInt(id)]];

  connection.query(query, upData, err => {
    if (err)
      res.status(500).render("errorPage", { error: err, errorCode: 500 });
    else
      res.redirect("/");
  });
});

module.exports = router;
