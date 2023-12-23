const {User} = require("../db/index");

async function createUser(name ,email ,password)
{
    const user = User.create({
        name,
        email,
        password
    })
    await user.save();
}

async function existingUser(email ,password)
{
    const exists = await User.findOne({email ,password});
    if(!exists)
    {
        return false;
    }
    return exists;
}

module.exports = {createUser,existingUser};