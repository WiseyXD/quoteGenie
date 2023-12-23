const express = require("express");
const router = express.Router();

const {createUser,loginUser, existingUser} = require("../controllers/user");

router.post("/signup",(req,res)=>{
    // Zod Validation
    // Sign up logic from controllers
    const {name,email,password} = req.body;
    try {
        const exists = existingUser(email,password);
        if(exists) throw new Error;
        createUser(name,email,password);
        res.status(201).json({
            msg : "User Created"
        })
    } catch (error) {
        res.status(500).json({
            msg : "User Already Exists"
        })
    }


})

router.get("/login",async(req,res)=>{
    // Loginlogic from controllers
    const {email,password} = req.body;
    try {
        const exists = await existingUser(email,password);
        if(!exists) throw new Error("Invalid Email or Password");
        console.log(exists);
        res.status(201).json({
            msg : "Login Successfull"
        })
    } catch (error) {
        res.status(500).json({
            msg : error
        })
    }

})


module.exports = router;