const express = require("express");
const router = express.Router();

const {createUser,loginUser, existingUser} = require("../controllers/user");
const {createToken,verifyToken} = require("../service/auth");
const {Quote} = require("../db/index");
const quotesArray = require("../db/quotes");
const {quoteOfTheDay,allUsers} = require("../controllers/mail")
const main = require("../service/mail");


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
        const token = createToken(email,password);
        res.status(201).json({
            msg : "Login Successfull",
            token : console.log(token)
        })
    } catch (error) {
        res.status(500).json({
            msg : error
        })
    }
})

router.get("/verify",async(req,res)=>{
    const data = await verifyToken(req.body.token);
    if(data)
    {
        const {email,password} = data;
        res.status(200).json({
            email,
            password
        })
        return;
    }
    res.status(500).json({
        msg : "Verification error"
    })
})

router.post("/quote",async (req,res)=>{
    // Add Quotes
    try {
        const result =await Quote.insertMany(quotesArray);
        console.log(result.insertedCount);
        res.status(201).json({
            msg : "Quotes Created",
        })
    } catch (error) {
        res.status(500).json({
            msg : "Issues while Inserting"
        })
    }
})

router.get("/getQuote",async(req,res)=>{
    try {
        const quote = await quoteOfTheDay();
        console.log(quote);
        res.status(201).json({
            msg : "Quote of the Day",
        })
    } catch (error) {
        res.status(500).json({
            msg : "Issues while getting Quote"
        })
    }
})

router.get("/mail",async(req,res)=>{
    try {
        const users= await allUsers();
        const quote = await quoteOfTheDay();
        await main(quote,users).catch(console.error);
        res.status(200).send("Check Email")
    } catch (error) {
        res.status(500).json({
            msg : error
        })
    }
})


module.exports = router;