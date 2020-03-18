const express = require("express");
const router = express.Router();
const connection = require('../db/db');

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/stories/:id" , (req,res) => {
  // console.log(res);
  var sql = 'SELECT * FROM posts';
  connection.query(sql , (err , rows , fields)=>{
      if(err) throw err;
      else{
          var urlid = req.params.id;
          console.log('query successful');
          obj = {print:[rows[urlid]]};
          // var imageUrl = obj.print[0].image;
          console.log(obj);
          // console.log(imageUrl);
          res.render('stories',{obj:obj});
      }
  });
});

module.exports = router;