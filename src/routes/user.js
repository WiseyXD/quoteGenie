const express = require("express");
const router = express.Router();

const {
    createUser,
    loginUser,
    existingUser,
    zUser,
} = require("../controllers/user");
const { createToken, verifyToken } = require("../service/auth");
const { Quote } = require("../db/index");
const quotesArray = require("../db/quotes");
const { quoteOfTheDay, allUsers } = require("../controllers/mail");
const main = require("../service/mail");

router.post("/signup", async (req, res) => {
    // Sign up logic from controllers
    const { name, email, password } = req.body;
    try {
        const result = zUser.safeParse({
            name,
            email,
            password,
        });
        if (!result.success) {
            throw new Error("Invalid user data");
        }
        const exists = await existingUser(email, password);
        if (exists) {
            throw new Error("User already exists");
        }
        await createUser(name, email, password);
        res.status(201).json({
            msg: "User Created",
        });
    } catch (error) {
        console.error("Error in catch block:", error); // Log the error for debugging
        res.status(500).json({
            msg: error.message,
        });
    }
});

router.get("/login", async (req, res) => {
    // Loginlogic from controllers
    const { email, password } = req.body;
    try {
        const exists = await existingUser(email, password);
        if (!exists) throw new Error("Invalid Email or Password");
        const token = createToken(email, password);
        res.status(201).json({
            msg: "Login Successfull",
            token,
        });
    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
});

router.get("/verify", async (req, res) => {
    // JWT Verify Logic from controller
    const data = await verifyToken(req.body.token);
    if (data) {
        const { email, password } = data;
        res.status(200).json({
            email,
            password,
        });
        return;
    }
    res.status(500).json({
        msg: "Verification error",
    });
});

router.get("/allQuotes", async (req, res) => {
    // Add Quotes
    try {
        const allQuote = await Quote.find({});
        res.status(201).json({
            allQuote,
        });
    } catch (error) {
        res.status(500).json({
            msg: "Issues while Inserting",
        });
    }
});

router.get("/getQuote", async (req, res) => {
    // Quote of the day
    try {
        const quote = await quoteOfTheDay();
        res.status(201).json({
            "Quote of the Day": quote,
        });
    } catch (error) {
        res.status(500).json({
            msg: "Issues while getting Quote",
        });
    }
});

router.get("/mail", async (req, res) => {
    try {
        const users = await allUsers();
        const quote = await quoteOfTheDay();
        await main(quote, users).catch(console.error);
        res.status(200).send("Check Email");
    } catch (error) {
        res.status(500).json({
            msg: error,
        });
    }
});

module.exports = router;
