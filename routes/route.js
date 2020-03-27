const express = require("express");
const router = express.Router();
const connection = require("../db/db");

router.get("/", (req, res) => {
  res.render("index", { loading: true, postList: [] }, (e, html) => {
    var sql = "select * from posts";
    connection.query({ sql: sql, timeout: 30000 }, (e, result) => {
      if (e)
        res.status(500).render("errorPage", {
          error: "Server Error\n" + e.sqlMessage,
          errorCode: 500
        });
      else {
        var posts = [];
        if (result.length) {
          result.forEach(element => {
            posts.push(element);
          });
        }

        var trimmedContent = [];
        posts.forEach(element => {
          if (element.content.length > 20) {
            //trim the string to the maximum length
            var trimmedString = element.content.substr(0, 60);
            //re-trim if we are in the middle of a word and
            trimmedString = trimmedString.substr(
              0,
              Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
            );
            trimmedContent.push(trimmedString);
          } else {
            trimmedContent.push(element.content);
          }
        });

        posts.forEach(element => {
          fx = element.fileurl;
          fileurl2 =
            "https://drive.google.com/uc?id=" +
            fx.slice(fx.search("d/") + 2, fx.search("/view"));
          element.fileurl = fileurl2;
        });
        // console.log(posts.slice(-3))
        
        res.render("index", { loading: false, postList: posts.slice(-3) , trimmedContent: trimmedContent.slice(-3) });
      }
    });
  });
});

router.get("/stories", (req, res) => {
  res.redirect("/stories/0");
});

router.get("/stories/:id", (req, res) => {
  var sql = "SELECT * FROM posts";
  connection.query(sql, (err, rows) => {
    if (err)
      res.status(500).render("errorPage", {
        error: "Server Error\n" + err.sqlMessage,
        errorCode: 500
      });
    else {
      var urlid = req.params.id;
      if (urlid > rows.length - 1) res.render("errorPage", { errorCode: 404 });
      else {
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
            if (e)
              res
                .status(500)
                .render("errorPage", {
                  error: "Server Error\n" + e.sqlMessage,
                  errorCode: 500
                });
            if (result.length) {
              result.forEach(element => {
                comment.push(element);
              });
            }

            res.render("stories", {
              obj: obj,
              fileurl: fileurl,
              uid: req.session.userId,
              comment: comment
            });
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
  let val = {
    content: txt,
    person_name: req.session.userName,
    post_id: parseInt(req.body.post_id)
  };
  connection.query(query, val, err => {
    if (err)
      res
        .status(500)
        .render("errorPage", { error: err.sqlMessage, errorCode: 500 });
    else res.redirect("/stories/" + req.params.id);
  });
});

module.exports = router;
