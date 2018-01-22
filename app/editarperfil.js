var mongoose = require('mongoose');
// load up the user model
var User = require('./models/user');

var ObjectId = mongoose.Schema.Types.ObjectId;

function editarPerfil(req) {
    const queryResult = new Promise(function(resolve, reject) {
        User.update({
            _id: req.user._id
        },{
            $set:{
                'local.name': req.body.name,
                'local.surname': req.body.surname,
                'local.edad': req.body.edad,
                'local.genero': req.body.genero,
                'local.estadociv': req.body.estadociv,
                'local.grado': req.body.facultadinfo,
                'local.biografia': req.body.biografia
            }
        }, (err, spot) => {
            if (err) {
                reject(err);
            }
            resolve(spot);
        });
    });
    return queryResult;
}

module.exports = {
    editarPerfil
};