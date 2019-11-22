let User = require('../../models/user');
let auth = require('../../utils/auth');

module.exports = function (router) {
    router.route('/users').post(function (req, res) {

        var user = new User(req.body);

        if (!user.email || !user.name || !user.password) {
            return res.status(400).send('validation, credentials are required.');
        }

        user.password = auth.hashPassword(req.body.password);
        user.role = "superAdmin";

        user.save(function (err, newUser) {

            if (err) {
                if (err.code == 11000) {
                    console.log(err);
                    return res.status(409).json('Duplication, save_failed, Unable to Save New User, Email: ' + user.email + ' already exists!');
                }           
                return res.status(400).send(err);
            }

            return res.status(200).json("User: " + newUser.name + " has been created.");
        })
    });
}