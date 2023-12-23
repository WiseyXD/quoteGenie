const {Quote,User} = require("../db/index");

async function quoteOfTheDay ()
{
    const quotes = await Quote.find();
    const quoteOfTheDay = await quotes[Math.floor(Math.random()*quotes.length)];
    return quoteOfTheDay;
}

async function allUsers ()
{
    let emailArray = [];
    const users = await User.find({});
    users.map((user)=>{
        emailArray.push(user.email);
    })
    return emailArray;
}

module.exports = {quoteOfTheDay,allUsers};