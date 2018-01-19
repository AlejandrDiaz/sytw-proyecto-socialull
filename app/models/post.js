var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var PostsSchema = mongoose.Schema({
    estado : String,                                                             
    file: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User' }
});

//likes : Number                                                    //numero de likes
//user_likes: [{type: Schema.Types.ObjectId ,ref: 'User'}]          //Personas que le han dado like

module.exports = mongoose.model('Post', PostsSchema);