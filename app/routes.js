var express = require('express');
var passport = require('passport');
var router = express.Router();

var editar = require('./editarperfil.js');
var editarPerfil = editar.editarPerfil;

var getPost = require('./obtenerpost.js');
var getPosts = getPost.getPosts;
var getPostsPersonal = getPost.getPostsPersonal;
var darLike= getPost.darLike;
var usuariodarLike = getPost.usuariodarLike;

var getAmigo = require ('./obteneramigos.js');
var getAmigos = getAmigo.getAmigos;
var setAmigos = getAmigo.setAmigos;
var deleteAmigos = getAmigo.deleteAmigos;
var getAmigoInfo = getAmigo.getAmigoInfo;

var getUsuario = require ('./buscarusuario.js');
var getUsuarios = getUsuario.getUsuarios;

var fotoP = require('./fotoperfil.js');
var fotoPerfil = fotoP.fotoPerfil;

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
  limits:{fileSize: 1000000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('file');


// ---------- RUTA / ----------
router.get('/', function(req, res, next) {
  if(isLoggedIn){
    res.redirect('/inicio');
  }
  else {
    res.render('login.ejs', { message: req.flash('inicioMessage') });
  }
});


// ---------- LOGIN ----------
router.get('/login', function(req, res, next) {
  res.render('login.ejs', { message: req.flash('loginMessage') });
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/inicio',
  failureRedirect: '/login',
  failureFlash: true,
}));


// ---------- SIGNUP ----------
router.get('/signup', function(req, res) {
  res.render('signup.ejs', { message: req.flash('signupMessage') });
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/inicio',
  failureRedirect: '/signup',
  failureFlash: true,
}));


// ---------- LOGUOT ----------
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


// ---------- INICIO ----------
router.get('/inicio', isLoggedIn, function(req, res) {
  getPosts(req.user)
    .then((response) => {
      getAmigoInfo(req.user.local.friends)
      .then((response2) => {
        res.render('index.ejs', {
          useramigos: response2,
          user: req.user,
          post: response
        });
      })
    .catch((response) => {
      console.log("Error al buscar posts");
    })
    .catch((response2) => {
      console.log("Error al buscar amigos");
    });
  });
});


// ---------- POST ----------
router.post('/post',isLoggedIn, (req, res) => {
  upload(req, res, (err) => {
    if(err){
      res.render('index.ejs')
    } else {
      if(req.file == undefined) {
        res.render('index.ejs');
         var newPost = new Post({
          estado: req.body.estado,
          owner: req.user._id,
        });

        newPost.save(function(err) {
          if(err) return console.log(err);
        });
        
        res.redirect('/inicio');
        
      } else {
        res.render('index.ejs', {
          file: 'uploads/${req.file.filename}'
        });
        var tipoFoto = /jpeg|jpg|png|gif/;
        var tipoVideo = /x-m4v|webm|x-ms-wmv|x-msvideo|3gpp|flv|x-flv|mp4|quicktime|mpeg|ogv|ts|mkv/;
        
        var extFoto = tipoFoto.test(path.extname(req.file.filename));
        var extVideo = tipoVideo.test(path.extname(req.file.filename));
        
        if(extFoto){
          var tipo = "foto";
        } else {
          if(extVideo) {
            var tipo = "video";
          }
        }
        
        var newPost = new Post({
          estado: req.body.estado,
          owner: req.user._id,
          type: tipo,
        });
        newPost.file = `uploads/${req.file.filename}`;
        newPost.save(function(err) {
          if(err) return console.log(err);
        });
        
        res.redirect('/inicio');
      }
    }
  });
});

router.get('/delete_post/:id', isLoggedIn, function(req, res){
	Post.remove({_id: req.params.id})
    .then((response) => {
    	console.log("Post borrado");
	    res.redirect('/inicio');
	});
});


// ---------- PERFIL ----------
router.get('/perfil', isLoggedIn, function(req, res, next) {
  getPostsPersonal(req.user)
    .then((response) => {
      res.render('perfil.ejs', {
        user: req.user,
        post: response
      });
    })
    .catch((response) => {
      console.log("Error al buscar posts");
    });
});


router.post('/foto_perfil',isLoggedIn, (req, res) => {
  upload(req, res, (err) => {
    if(err){
      res.render('perfil.ejs');
    } else {
      if(req.file == undefined) {
        res.render('perfil.ejs');
      } else {
        var foto_perfil = `uploads/${req.file.filename}`;
        fotoPerfil(req.user,foto_perfil)
          .then((response) => {
            res.redirect('/perfil');
          })
          .catch((response) => {
            console.log("Error al cambiar la foto de perfil");
          });
      }
    }
  });
});


// ---------- EDITAR PERFIL ----------
router.get('/editarp', isLoggedIn, function(req, res, next) {
		res.render('editarp.ejs', {
			user: req.user
		});
	});
	

router.post('/editarp', isLoggedIn, function(req, res) {
  editarPerfil(req)
    .then((response) =>{
      res.redirect('/perfil');
    })
    .catch((response)=>{
      console.log("Error al editar el perfil");
    });
});


// ---------- PERFIL AMIGO ----------
router.get('/perfil_amigo/:id', isLoggedIn, function(req, res) {
  getPostsPersonal(req.params.id)
    .then((response) => {
      getAmigoInfo(req.params.id)
      .then((response2) => {
        res.render('perfilamigo.ejs', {
          amigo: response2[0],
          user: req.user,
          post: response
        });
      })
    .catch((response) => {
      console.log("Error al buscar posts");
    })
    .catch((response2) => {
      console.log("Error al buscar amigos");
    });
  });
});


// ---------- AMIGOS ----------
router.get('/amigos', isLoggedIn, function(req, res) {
  getAmigos(req.user)
    .then((response) =>{
      res.render('amigos.ejs',{
        user: req.user,
        amigo: response
      });
    })
    .catch((response)=>{
      console.log("Error al buscar amigos");
    });
});

router.post('/solicitud_amigo/:id', isLoggedIn, function(req, res) {
  setAmigos(req.user,req.params.id)
    .then((response) =>{
      res.redirect('/inicio');
    })
    .catch((response)=>{
      console.log("Error al entablar amistad");
    });
});

router.post('/delete_amigo/:id', isLoggedIn, function(req, res) {
  deleteAmigos(req.user,req.params.id)
    .then((response) =>{
      res.redirect('/amigos');
    })
    .catch((response)=>{
      console.log("Error al borrar amistad");
    });
});


// ---------- BUSQUEDA ----------
router.post('/buscar', isLoggedIn, function(req, res) {
  getUsuarios(req.user,req.body.search_data)
    .then((response) =>{
      res.render('busqueda.ejs',{
        user: req.user,
        usuario: response
      });
    })
    .catch((response)=>{
      console.log("Error al buscar usuarios");
    });
});


// ---------- LIKE POST ----------
router.post('/like/:id', isLoggedIn, function(req, res) {
  darLike(req.params.id)
    .then((response) => {
      usuariodarLike(req.params.id,req.user)
      .then((response2) => {
        res.redirect('back');
        
      })
    .catch((response) => {
      console.log("Error al buscar posts");
    })
    .catch((response2) => {
      console.log("Error al buscar amigos");
    });
  });
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.redirect('/login');
}

function checkFileType(file, cb){
  var filetypes = /jpeg|jpg|png|gif|x-m4v|webm|x-ms-wmv|x-msvideo|3gpp|flv|x-flv|mp4|quicktime|mpeg|ogv|ts|mkv/;
  
  var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  
  var mimetype = filetypes.test(file.mimetype);
  
  if(mimetype && extname){
    return cb(null, true);
  } else{
    cb('Error: sólo se admiten fotos o vídeos!');
  }
}
