const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const bodyParser = require('body-parser');
const session = require('express-session');

// 10 Minute expiry time
app.use(session({
  secret: 'some random key',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 600000}
}));

app.use(expressLayouts);
app.set("view engine", "ejs");

//serving static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "node_modules")));

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Routes
app.use("/", require("./routes/route"));
app.use("/", require("./routes/user"));
// app.use("/", require("./routes/admin"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("Server started on PORT " + PORT));
