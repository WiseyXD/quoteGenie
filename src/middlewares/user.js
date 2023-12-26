const { createToken, verifyToken } = require("../service/auth");

async function userMiddleware(req, res, next) {
    // Middleware for Auth
    try {
        const token = req.headers.authorization;
        const data = await verifyToken(token);
        if (data) {
            const { email, password } = data;
            req.email = email;
            next();
        }
    } catch (error) {
        res.status(500).json({
            msg: "Verification error",
        });
    }
}

module.exports = userMiddleware;
