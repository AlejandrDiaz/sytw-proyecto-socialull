var mongoose = require('mongoose');
// load up the user model
var Post = require('./models/post');

var ObjectId = mongoose.Schema.Types.ObjectId;

function getPosts(user) {
    const queryResult = new Promise(function(resolve, reject) {
        Post.find({
            owner: user
        }, (err, spot) => {
            if (err) {
                reject(err);
            }
            resolve(spot);
        });
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

module.exports = {
    getPosts,
    getPostInfo
};