const jwt = require('jsonwebtoken');

import { createError } from './error';

const verifyToken = (req, res, next) => { 
    const token = req.cookies.access_token;
    if (!token) next(createError(401, 'You are not authorized'));

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) next(createError(401, 'You are not authorized'));
        req.user = decoded;
        next();
    });
}

module.exports = verifyToken;