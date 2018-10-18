var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

// Register
router.get('/register', function(req, res) {
  res.send('register');
});

// Login
router.get('/login', function(req, res) {
  res.send('login');
});

// Register User
router.post('/register', function(req, res) {
  if(req.user.usertype==='admin'){
    var name = req.body.name;
    var username = req.body.username;
    var password = req.body.password;
    var usertype = req.body.usertype;
  	var newUser = new User({
  		name: name,
  		username: username,
  		password: password,
  		usertype: usertype
  	});
  	User.createUser(newUser, function(err, user) {
  		if (err) throw err;
  		console.log(user);
  	});
  	res.send('200');
  }
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username, function(err, user) {
      if (err) throw err;
      if (!user) {
        return done(null, false, {
          message: 'Unknown User'
        });
      }
      User.comparePassword(password, user.password, function(err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: 'Invalid password'
          });
        }
      });
    });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local',{ successRedirect: '/', failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
