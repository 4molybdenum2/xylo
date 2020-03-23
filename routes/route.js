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
          if(urlid > rows.length - 1){
            // TODO: Error 404 Implementation -> on errorpage.ejs
            res.render("errorPage", {errorCode: 404});
          }else{
            obj = {print:[rows[urlid]]};
            fx = obj.print[0].fileurl;
            fileurl = "https://drive.google.com/uc?id=" + fx.slice(fx.search("d/")+2, fx.search("/view"));
            res.render('stories',{obj:obj, fileurl: fileurl});
          }
      }
  });
});

module.exports = router;