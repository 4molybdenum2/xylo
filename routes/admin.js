const express = require('express');
const router = express.Router();

router.get('/admin',(req,res)=>{
    res.send("Welcome to the admin page");
});

module.exports = router;