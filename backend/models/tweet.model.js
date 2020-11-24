const mongoose = require("mongoose");

const Schema = mongoose.Schema

const tweetSchema = Schema({
    user : {type : String, required : true},
    userID : {type : String, required : true},
    content : String, 
    likedBy: {type : []},
    retweetedBy : { type : []},
    comments : {type : []},
    tweetPicture : String
},
{
    timestamps : true
}
)

const tweetModel = mongoose.model('tweetModel', tweetSchema)

module.exports = tweetModel