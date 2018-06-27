const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Bring in User Model
const User = require('../models/user');

// Bring in Secret
require('dotenv').config()

// Signup Form
router.get('/signup', function(req, res){
  res.send({"message": "test"});
});

// Signup Proccess
router.post('/signup', function(req, res){
  //console.log(req.body)
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;

  const user = {...req.body}

  req.checkBody('firstname', 'Firstname is required').notEmpty();
  req.checkBody('lastname', 'Lastname is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('repeat', 'Password is required').notEmpty();
  req.checkBody('repeat','Passwords do not match.').equals(req.body.password);


  let errors = req.validationErrors();

  if(errors){
    res.json({errors: errors});
  } else {
    let newUser = new User({...user})

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if(err){
          res.json({error: "Something went wrong!"});
          return
        }
        newUser.password = hash;
        newUser.save((err, user) => {
          if(err){
            if(err.code === 11000) {
              res.json({error: "Email already exists!"});
              return
            }
            return;
          } else {
            res.json({"message": "You are now registered and can log in!"});
          }
        });
      });
    });
  }
});

// Login Process
router.post('/login', function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const signature = process.env.SECRET;

  if (!req.body.email)
    return res.send({ error: 'username required' })
  if (!req.body.password)
    return res.send({ error: 'password required' })

  User.findOne({email: email}, function(err, user) {
    if(err) return res.send({error: "Internal error happened"});
    if(!user) {
      return res.send({error: "Wrong email/password"})
    } else {
      let userData = user;
      bcrypt.compare(password, userData.password, function(err, isMatch){
        if(err) res.send({error: "Something went wrong!"});
        if(isMatch) {
          const token = jwt.sign({email: userData.email, password: userData.password}, signature, {expiresIn: '300'});
          userData.token = token;
          return res.send({token: userData.token, firstname: userData.firstname, lastname: userData.lastname, expiresIn: 300});
        } else {
          res.send({error: "Wrong email/password"})
          }
        });
      }
    });
});


module.exports = router;
