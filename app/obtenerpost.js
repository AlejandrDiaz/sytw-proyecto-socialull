var mongoose = require('mongoose');
// load up the user model
var Post = require('./models/post');
var User = require('./models/user');

var ObjectId = mongoose.Schema.Types.ObjectId;


function getPostsPersonal(user) {
    const queryResult = new Promise(function(resolve, reject) {
        Post.find({
            owner: user
        }, (err, spot) => {
            if (err) {
                reject(err);
            }
            resolve(spot);
        }).sort({'_id': -1});
    });

    return queryResult;
}



function getPosts(user) {
    const queryResult = new Promise(function(resolve, reject) {
        Post.find({
            $or:[
                {owner: user},
                {owner: {$in: user.local.friends}}
                ]
        }, (err, spot) => {
            if (err) {
                reject(err);
            }
            resolve(spot);
        }).sort({'_id': -1});
    });

    return queryResult;
}


function getPostInfo(Post) {
    const queryResult = new Promise(function(resolve, reject) {
        Post.find({
            _id: Post
        }, (err, PostSearch) => {
            if (err) {
                reject(err);
            }
            resolve(PostSearch);
        });
    });

    return queryResult;
}

function darLike(post){
    const queryResult = new Promise(function(resolve, reject) {
        Post.update({
            _id: post
        },
        {
            $inc:{likes:1}
        }, (err, PostSearch) => {
            if (err) {
                reject(err);
            }
            resolve(PostSearch);
        });
    });

    return queryResult;
}

function usuariodarLike(post,user){
    const queryResult = new Promise(function(resolve, reject) {
        Post.update({
            _id: post
        },
        {
            $push:{user_likes:user}
        }, (err, PostSearch) => {
            if (err) {
                reject(err);
            }
            resolve(PostSearch);
        });
    });

    return queryResult;
}


module.exports = {
    getPostsPersonal,
    getPosts,
    getPostInfo,
    darLike,
    usuariodarLike
};