const {User} = require("../db/index");
const z = require("zod");

const zUser = z.object({
    name : z.string().min(2 ,{message : "Must be 2 or more characters long"}),
    email : z.string().email({message : "Invalid Email"}),
    password : z.string().min(5,{message : "Password length must be 5 or more than 5 characters"})
})

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

module.exports = {createUser,existingUser,zUser};