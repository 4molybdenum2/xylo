const express = require("express");
const router = express.Router();
const connection = require("../db/db");

router.get("/", (req, res) => {
  res.render("index", { loading: true, postList: [] }, (e, html) => {
    var sql = "select * from posts order by post_date desc limit 3";
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

        res.render("index", {
          loading: false,
          postList: posts,
          trimmedContent: trimmedContent
        });
      }
    });
  });
});

router.get("/stories", (req, res) => {
  let query = "select * from posts";
  connection.query({sql: query, timeout: 60000}, (e, rows) => {
    if(e)
      res.status(500).render("errorPage", {
        error: "Server Error\n"+e.sqlMessage,
        errorCode: 500
      });
    else{
      var posts = [];
      if(rows.length){
        rows.forEach((element) => {
          posts.push(element);
        });
      }

      posts.forEach(element => {
        fx = element.fileurl;
        fileurl2 =
          "https://drive.google.com/uc?id=" +
          fx.slice(fx.search("d/") + 2, fx.search("/view"));
        element.fileurl = fileurl2;
      });

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
      
      res.render("allStories", {
        postList: posts,
        trimmedContent: trimmedContent
      });
    }
  });
});

router.get("/stories/:id", (req, res) => {
  var sql = 'SELECT * FROM posts LIMIT 1 OFFSET '+connection.escape(parseInt(req.params.id));
  connection.query({ sql: sql, timeout: 30000}, (err, rows) => {
    if (err)
      res.status(500).render("errorPage", {
        error: "Server Error\n" + err.sqlMessage,
        errorCode: 500
      });
    else {
      if (!rows.length) res.render("errorPage", { errorCode: 404 });
      else {
        obj = { print: [rows[0]] };
        fx = obj.print[0].fileurl;
        fileurl =
          "https://drive.google.com/uc?id=" +
          fx.slice(fx.search("d/") + 2, fx.search("/view"));

        var comment = [];
        connection.query(
          {
            sql:
              "SELECT person_name, content FROM comments WHERE post_id = " +
              connection.escape(obj.print[0].id),
            timeout: 20000
          },
          (e, result) => {
            if (e)
              res.status(500).render("errorPage", {
                error: "Server Error\n" + e.sqlMessage,
                errorCode: 500
              });
            if (result.length) {
              result.forEach(element => {
                comment.push(element);
              });
            }

            connection.query(
              {
                sql:
                  "select count(*) as count, value from likes where pid = " +
                  connection.escape(obj.print[0].id) +
                  " group by value",
                timeout: 15000
              },
              (er, result2) => {
                if (er)
                  res.status(500).render("errorPage", {
                    error: "Server Error\n" + e.sqlMessage,
                    errorCode: 500
                  });
                else {
                  var like, dis;
                  if (result2.length == 2) {
                    like = result2[1].count;
                    dis = result2[0].count;
                  } else if (result2.length == 1) {
                    if (result2[0].value == 1) {
                      like = result2[0].count;
                      dis = 0;
                    } else {
                      like = 0;
                      dis = result2[0].count;
                    }
                  } else like = dis = 0;

                  res.render("stories", {
                    obj: obj,
                    fileurl: fileurl,
                    uid: req.session.userId,
                    comment: comment,
                    likes: like,
                    dislikes: dis,
                    curId: req.params.id
                  });
                }
              }
            );
          }
        );
      }
    }
  });
});

router.post("/stories/:id/likeDislike", (req, res) => {
  let query =
    "select * from likes where pid = " +
    connection.escape(req.body.post_id) +
    " and uid = " +
    connection.escape(req.session.userId);
  let like_or_dislike = req.body.ld == "like" ? 2 : 1;
  connection.query({ sql: query, timeout: 15000 }, (e, result) => {
    if (e)
      res
        .status(500)
        .render("errorPage", { error: e.sqlMessage, errorCode: 500 });
    else if (result.length) {
      connection.query(
        {
          sql:
            "update likes set value = " +
            connection.escape(like_or_dislike) +
            " where pid = " +
            connection.escape(req.body.post_id) +
            " and uid = " +
            connection.escape(req.session.userId),
          timeout: 15000,
        },
        e => {
          if (e)
            res
              .status(500)
              .render("errorPage", { error: e.sqlMessage, errorCode: 500 });
          else res.redirect("/stories/" + req.params.id);
        }
      );
    } else {
      let query2 = "insert into likes set ?";
      let val = {
        uid: req.session.userId,
        pid: req.body.post_id,
        value: like_or_dislike
      };

      connection.query({ sql: query2, timeout: 15000 }, val, e => {
        if (e)
          res
            .status(500)
            .render("errorPage", { error: e.sqlMessage, errorCode: 500 });
        else res.redirect("/stories/" + req.params.id);
      });
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
  connection.query({ sql: query, timeout: 30000 }, val, err => {
    if (err)
      res
        .status(500)
        .render("errorPage", { error: err.sqlMessage, errorCode: 500 });
    else res.redirect("/stories/" + req.params.id);
  });
});

module.exports = router;
