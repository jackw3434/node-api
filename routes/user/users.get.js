let Users = require('../../models/user');

module.exports = function (router) {
    router.route('/users').get(function (req, res) {

        //!hasPermission(req.body.accessToken, "users.get", req, res);

        Users.find(function (err, users) {

            if (err) {
                return res.status(400).send(err);
            }

            res.status(200).json({ users: users });
        })
    });
}