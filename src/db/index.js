const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://WiseyXD:Qwerty88**@testcluster.hbkxnkx.mongodb.net/quoteGenerator");

const UserSchema = mongoose.Schema({
    name :{
        type : String,
        required : true,
    },
    email :{
        type : String,
        required : true,
        unique : true
    },
    password :{
        type : String,
        required : true,
    },
})

const User = mongoose.model("User" , UserSchema);

module.exports = {User};