
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  local: {
    name: String,
    surname: String,
    edad: Number,
    email: String,
    password: String
  }
});

//friends: [{type: Schema.Types.ObjectId ,ref: 'User'}]     //Personas que son amigos del usuario
//se puede agregar algún tipo de estado de solicitud, algo como solicitud pendiente,aceptado, ...

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);






/*
'use strict';
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = mongoose.Schema({
    local: {
        name: String,
        surname: String,
        email: String,
        password: String
    }
});

// métodos ======================
// generar un hash a partir de la contraseña
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// verificar si la contraseña es válida
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// exportar el modelo
module.exports = mongoose.model('User', UserSchema);
*/