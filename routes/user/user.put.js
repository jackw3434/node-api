let User = require('../../models/user');

module.exports = function (router) {
    router.route('/users/:id').put(function (req, res) {

        User.findById({ _id: req.params.id }, function (err, user) {

            if (err) {
                return res.status(400).send(err);
            }

            user.name = req.body.name;
            user.email = req.body.email;
            user.password = req.body.password;

            user.save(function (err, editedUser) {

                if (err) {
                    return res.status(400).send(err);
                }

                return res.status(200).json("User: " + editedUser.name + " has been edited.");
            })
        })
    });
}