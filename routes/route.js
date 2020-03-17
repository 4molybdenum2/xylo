const express = require("express");
const router = express.Router();

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/stories" , (req,res) => {
  res.render("stories");
});

module.exports = router;