const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const checkAuth = (req, res, next) => {
    // Get the token from the request headers
    const token = req.headers.authorization;
    // console.log(token);
    // Check if the token exists
    if (!token) {
        return res.status(401).json({ message: 'Anjirr kOEN looe kok lapo . pengen ngehack ta' });
    }
    try {
        // Remove the "Bearer " prefix from the token
        const tokenWithoutBearer = token.replace('Bearer ', '');
        // Verify the token
        const decodedToken = jwt.verify(tokenWithoutBearer, JWT_SECRET);
        req.userData = decodedToken;
        // console.log(decodedToken);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = checkAuth;
