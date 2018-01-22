var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
  local: {
    name: String,
    surname: String,
    edad: Number,
    email: String,
    password: String,
    estadociv: String,
    genero: String,
    grado: String,
    biografia: String,
    avatar: { type: String , default: "images/avatar.png"},
    friends: [{type: Schema.Types.ObjectId , ref: 'User'}]
  }
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);