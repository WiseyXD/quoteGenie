require('dotenv').config();
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL);

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

const quoteSchema = mongoose.Schema({
    quote : {
        type :String,
        required :true,
    },
    author : {
        type :String,
        required :true,
    }
});


const Quote = mongoose.model("Quote",quoteSchema);
const User = mongoose.model("User" , UserSchema);

module.exports = {User,Quote};