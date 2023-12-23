const jwt = require("jsonwebtoken");
const jwtKey = "secret";

function createToken(email, password) {
    const payload = {
        email,
        password,
    };
    const token = jwt.sign(payload, jwtKey);
    return token;
}

async function verifyToken(token) {
    try {
        var decoded = jwt.verify(token, jwtKey);
        return decoded;
    } catch (err) {
        return false;
    }
}

module.exports = {createToken,verifyToken}