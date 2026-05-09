const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },       // payload — data embedded inside the token
        process.env.JWT_SECRET, // secret key used to sign the token
        { expiresIn: '7d' }   // token expires after 7 days
    );
};

module.exports = generateToken;