let User = require('../../models/user');
let auth = require('../../utils/auth');

module.exports = function (router) {
    router.route('/users').post(function (req, res) {

        var user = new User(req.body);

        user.password = auth.hashPassword(req.body.password);

        user.save(function (err, newUser) {

            if (err) {
                return res.status(400).send(err);
            }

            res.status(200).json("User: " + newUser.name + " has been created.");
        })
    });
}