const express = require("express");
const router = express.Router();
const connection = require("../db/db");
const nodemailer = require("nodemailer");
const mailer = require("../config/sendinblue");

router.get("verify/:token/:mail", (req, res) => {
  const token = req.params.token;
  const email = req.params.mail;

  connection.query(
    {
      sql:
        "select token from verification where email = " +
        connection.escape(email),
      timeout: 20000
    },
    (e, row) => {
      if (e)
        res.status(500).render("errorPage", {
          error: "Server Error\n" + e.sqlMessage,
          errorCode: 500
        });
      else {
        if (row.length) {
          if (row[0].token == token) {
            connection.query(
              {
                sql:
                  "update users set active = " +
                  connection.escape(true) +
                  " where email = " +
                  connection.escape(email),
                timeout: 20000
              },
              e2 => {
                if (e2)
                  res.status(500).render("errorPage", {
                    error: "Server Error\n" + e2.sqlMessage,
                    errorCode: 500
                  });
                else res.redirect(`/login?mail=${email}`);
              }
            );
          }
        } else res.status(401).redirect("/login");
      }
    }
  );
});

module.exports = router;
