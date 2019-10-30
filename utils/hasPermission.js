var jwt = require('express-jwt');
let secret = require('../config/jwtSecret').secret;



module.exports = function (req, res) {
    required: {
        jwt({
            secret: new Buffer(secret, 'base64')
        });
    }
}
