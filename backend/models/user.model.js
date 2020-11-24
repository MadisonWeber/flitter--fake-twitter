const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    user : {type : String, required : true},
    email : { type : String, required : true},
    password : { type : String, required : true},
    followers: {type: []},
    following : {type : []},
    profilePic : {type : String, required : false, default : ""} 
})

const User = mongoose.model('User', userSchema)

module.exports = User