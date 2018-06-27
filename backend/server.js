const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require('passport');
const aws = require("aws-sdk");
const cors = require('cors');
const jwt = require('jsonwebtoken');

// init app
const app = express();

// disable cors
app.use((req,res,next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Requested-With, Accept')
  // res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  next();
})

// Get Mongo URL from env file
require('dotenv').config();

const options = {
    useMongoClient: true
}
mongoose.connect(process.env.MONGO, options);
const db = mongoose.connection;

// Check connection
db.once("open", () => {
    console.log("connected to Mongo DB")
})

// check for db errors
db.on("error", (err) => {
    console.log("err")
})

// Body Parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// set public folder
// app.use(express.static(path.join(__dirname, '/public')));


  // Express Validator Middleware
  app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;

      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));


// Global User
app.get("*", function(req, res, next) {
    res.locals.user = req.user || null;
    next();
})

const users = require("./routes/users");
app.use("/users", users);

// start server
app.listen(3001, ()=> {
    console.log("Server started on port 3001");
});
