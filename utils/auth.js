let jwtMiddleware = require('express-jwt');
let jwt = require('jsonwebtoken');
let crypto = require('crypto');
let authConfig = require("../config/auth");
let accessTokenTime = require('../config/auth').accessTokenTime;

let getTokenFromHeaders = (req) => { 
    let { headers: { authorization } } = req;
    if (authorization && authorization.split(' ')[0] === 'Token') {
        return authorization.split(' ')[1];
    }
    return null;
};

let auth = {
    required: jwtMiddleware({
        secret: authConfig.jwtSecret,
        userProperty: 'tokenData',
        getToken: getTokenFromHeaders,
        credentialsRequired: true
    }),
    optional: jwtMiddleware({
        secret: authConfig.jwtSecret,
        userProperty: 'tokenData',
        getToken: getTokenFromHeaders,
        credentialsRequired: false,
    }),
    hashPassword: function (password) {
        return crypto.pbkdf2Sync(password, authConfig.salt, 10000, 512, 'sha512').toString('hex');
    },
    generateAccessToken: function (user) {
        let expirationDate = new Date();
        return jwt.sign({
            user_email: user.email,
            user_id: user._id,
            user_role: user.role,
            exp: parseInt((expirationDate.getTime() / 1000) + accessTokenTime, 10)
        }, authConfig.jwtSecret);
    }
};

module.exports = auth;