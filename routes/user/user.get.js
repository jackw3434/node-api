let Users = require('../../models/user');
let auth = require('../../utils/auth');


module.exports = function (router) {
    router.route('/users/:id').get(auth.required, function (req, res) {

        // !hasPermission(req.body.accessToken, "users.get", req, res);

        let user_id = req.params.id;

        Users.findById({ _id: user_id }, function (err, user) {

            if (err) {
                return res.status(400).send(err);
            }

            let accessToken = auth.generateAccessToken(user);

            res.status(200).json({ user: user, accessToken: accessToken });
        })
    });
}