let Users = require('../../models/user');
let auth = require('../../utils/auth');

module.exports = function (router) {
    router.route('/user/:id').get(auth.required, function (req, res) {

        Users.findById({ _id: req.params.id }, function (err, user) {

            if (err || !user || user.length == 0) {
                return res.status(400).send('Validation_error, No matching User for id ' + req.params.id);
            }

            res.status(200).json({ user: user });
        })
    });
}