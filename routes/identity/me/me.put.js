let User = require('../../../models/user');
let auth = require('../../../utils/auth');

module.exports = function (router) {
    router.route('/users/me/:id').put(auth.required, function (req, res) {

        User.findById({ _id: req.params.id }, function (err, user) {

            if (err) {
                return res.status(400).send(err);
            }

            if (req.body.password && user.password != req.body.password) {
                return res.status(400).send("Cannot Change a User's Password");
            }

            if (req.body.role && user.role != req.body.role) {
                return res.status(400).send("Cannot Change a User's Role");
            }

            user.first_name = req.body.first_name;
            user.surname = req.body.surname;
            user.email = req.body.email;

            user.save(function (err, editedUser) {

                if (err) {
                    return res.status(400).send(err);
                }

                return res.status(200).json("User: " + editedUser.first_name + " has been edited.");
            })
        })
    });
}