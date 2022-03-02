const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../utils/error');

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.username = decodedToken.username;
        next();
    }
    catch (error) {
        return res.status(401).send(new UnauthorizedError('Unauthorized action'))
    }
}

module.exports = authenticate;