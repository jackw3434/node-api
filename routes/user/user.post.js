let User = require('../../models/user');

module.exports = function (router) {
    router.route('/users').post(function (req, res) {

        var user = new User(req.body);

        user.save(function (err, newUser) {

            if (err ) {
                return res.status(400).send(err);
            }

            res.status(200).json("User: " + newUser.name +" has been created.");
        })
    });
}