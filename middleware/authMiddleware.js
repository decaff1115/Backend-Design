const jwt = require('jsonwebtoken');


function authenticateToken(req, res, next) {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    if (!token) return res.sendStatus(403); // No token, Forbidden

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Token invalid, Forbidden
        req.user = user; // Add user info to request
        next(); // Proceed to the next route handler
    });

};


module.exports = {authenticateToken};