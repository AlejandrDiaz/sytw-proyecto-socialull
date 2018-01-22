var mongoose = require('mongoose');
// load up the user model
var User = require('./models/user');

var ObjectId = mongoose.Schema.Types.ObjectId;

function getUsuarios(user,search_data) {      //Actualmente devulve todos los usuarios de la base de datos
    const queryResult = new Promise(function(resolve, reject) {
        User.find({
            $or: [
                {"local.name": { $regex:".*"+ search_data + ".*",'$options' : 'i'}},
                {"local.surname": { $regex:".*"+ search_data + ".*",'$options' : 'i'}}
            ]
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
    getUsuarios
};