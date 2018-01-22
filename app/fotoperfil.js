var mongoose = require('mongoose');
// load up the user model
var User = require('./models/user');

var ObjectId = mongoose.Schema.Types.ObjectId;

function fotoPerfil(user,foto_perfil) { 
    const queryResult = new Promise(function(resolve, reject) {
        User.update({
            _id: user._id
        },
        {
            $set:{'local.avatar': foto_perfil}
        },
        { multi: false }
        ,(err, spot) => {
            if (err) {
                reject(err);
            }
            resolve(spot);
        });
    });
    return queryResult;
}

module.exports = {
    fotoPerfil
};