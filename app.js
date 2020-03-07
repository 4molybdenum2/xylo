const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

app.use(expressLayouts);
app.set('view engine' , 'ejs');

//serving static files
app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname,'node_modules')));

//Routes
app.use('/' , require('./routes/index'));
app.use('/' , require('./routes/about'));
app.use('/',require('./routes/admin'));

app.get('/' , (req,res)=>{
    res.send('Welcome');
    }   
)

const PORT = process.env.PORT || 5000;

app.listen(PORT , console.log('Server started on PORT '+PORT));