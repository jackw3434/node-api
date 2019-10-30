let Users = require('../../models/user');


module.exports = function (router) {
    router.route('/users/:id').get(function (req, res) {

        // !hasPermission(req.body.accessToken, "users.get", req, res);

        let user_id = req.params.id;

        Users.findById({ _id: user_id }, function (err, users) {

            if (err) {
                return res.status(400).send(err);
            }

            res.status(200).json({ users: users });
        })
    });
}