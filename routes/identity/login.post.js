let User = require('../../models/user');
let auth = require('../../utils/auth');

module.exports = function (router) {
    router.route('/login').post(function (req, res) {

        let userEmail = req.body.email;
        let userPassword = req.body.password;

        User.find({ email: userEmail }, function (err, user) {

            if (err) {
                return res.status(400).send(err);
            }

            if (auth.hashPassword(userPassword) == user[0].password) {

                let accessToken = auth.generateAccessToken(user[0]);

                return res.status(200).json({ successMessege: "User Logged In", accessToken: accessToken });

            } else {

                return res.status(400).send("Incorrect Password");
            };
        });
    });
}