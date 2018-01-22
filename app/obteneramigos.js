var mongoose = require('mongoose');
// load up the user model
var User = require('./models/user');

var ObjectId = mongoose.Schema.Types.ObjectId;

function getAmigos(user) { 
    const queryResult = new Promise(function(resolve, reject) {
        User.find({
            _id: user.local.friends
        }, (err, spot) => {
            if (err) {
                reject(err);
            }
            resolve(spot);
        });
    });
    return queryResult;
}

function getAmigosInfo(user) { 
    const queryResult = new Promise(function(resolve, reject) {
        User.find({
            _id: user._id
        }, (err, spot) => {
            if (err) {
                reject(err);
            }
            resolve(spot);
        });
    });
    return queryResult;
}

function setAmigos(user,amigo){
    const queryResult = new Promise(function(resolve, reject) {
        User.update({
            _id: user._id
        },
        {
            $addToSet:{'local.friends': amigo}
        },(err, spot) => {
            if (err) {
                reject(err);
            }
            resolve(spot);
        });
    });
    return queryResult;
}

function deleteAmigos(user,amigo){
    const queryResult = new Promise(function(resolve, reject) {
        User.update({
            _id: user._id
        },
        {
            $pull:{'local.friends': amigo}
        },(err, spot) => {
            if (err) {
                reject(err);
            }
            resolve(spot);
        });
    });
    return queryResult;
}

function getAmigoInfo(user) {
    const queryResult = new Promise(function(resolve, reject) {
        User.find({
            _id: user
        }, (err, AmigoSearch) => {
            if (err) {
                reject(err);
            }
            resolve(AmigoSearch);
        });
    });
    console.log(queryResult);
    return queryResult;
}

module.exports = {
    getAmigos,
    setAmigos,
    deleteAmigos,
    getAmigoInfo
};