var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var PostsSchema = mongoose.Schema({
    estado : String,                                                             
    file: String,
    type: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    likes: { type:Number, default: 0},
    user_likes: [{type: Schema.Types.ObjectId ,ref: 'User'}]
});

module.exports = mongoose.model('Post', PostsSchema);