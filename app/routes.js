var express = require('express');
var passport = require('passport');
var router = express.Router();

var getPost = require('./obtenerpost.js');
var getPosts = getPost.getPosts;
var Post = require('./models/post');
var fs = require('fs');
var path = require('path');
var multer = require('multer');


var storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    var nombre_archivo = file.originalname;
    var ext_archivo = path.extname(nombre_archivo);
    cb(null, file.fieldname + '-' + Date.now() + ext_archivo);
  }
});

var upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('file');

function checkFileType(file, cb){
  var filetypes = /jpeg|jpg|png|gif|/;
  
  var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  
  var mimetype = filetypes.test(file.mimetype);
  
  if(mimetype && extname){
    return cb(null, true);
  } else{
    cb('Error: Images Only!');
  }
}

router.post('/post', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      res.render('index.ejs')
    } else {
      if(req.file == undefined) {
        res.render('index.ejs')
      } else {
        res.render('index.ejs', {
          file: 'uploads/${req.file.filename}'
        });
        var newPost = new Post({
          //likes: 0,
          estado: req.body.estado,
          owner: req.user._id,
          file: `uploads/${req.file.filename}`
        });
        newPost.save(function(err) {
          if(err) return console.log(err);
        });
        
        res.redirect('/inicio');
      }
    }
  });
});


router.get('/', function(req, res, next) {
  res.render('login.ejs', { message: req.flash('inicioMessage') });
});

router.get('/login', function(req, res, next) {
  res.render('login.ejs', { message: req.flash('loginMessage') });
});

router.get('/signup', function(req, res) {
  res.render('signup.ejs', { message: req.flash('signupMessage') });
});

router.get('/inicio', isLoggedIn, function(req, res) {
  getPosts(req.user)
    .then((response) => {
      res.render('index.ejs', {
        user: req.user,
        post: response
      });
    })
    .catch((response) => {
      console.log("Error al buscar posts");
    });
});


router.get('/amigos', isLoggedIn, function(req, res) {
  res.render('amigos.ejs', { user: req.user });
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/inicio',
  failureRedirect: '/signup',
  failureFlash: true,
}));

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/inicio',
  failureRedirect: '/login',
  failureFlash: true,
}));


module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.redirect('/');
}