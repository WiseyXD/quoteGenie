const { createToken, verifyToken } = require("../service/auth");

async function userMiddleware(req, res, next) {
    // Middleware for Auth
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(400).json({
                msg: "Token Not present",
            });
        }
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
        return;
    }
}

module.exports = userMiddleware;
