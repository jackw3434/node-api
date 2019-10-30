let Users = require('../../models/user');


module.exports = function (router) {
    router.route('/users/:id').put(function (req, res) {

       // !hasPermission(req.body.accessToken, "users.get", req, res);       

        Users.findById({_id: req.body._id},function (err, users) {

            if (err) {
                return res.status(400).send(err);
            }

            res.status(200).json({ users: users });
        })
    });
}