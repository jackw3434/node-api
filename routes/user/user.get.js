let Users = require('../../models/user');
let auth = require('../../utils/auth');
let hasPermission = require('../../utils/hasPermission');


module.exports = function (router) {
    router.route('/users/:id').get(auth.required, function (req, res) {
  
        //if (!hasPermission(req.tokenData, "users.get", req, res)) return;
        
        Users.findById({ _id: req.params.id }, function (err, user) {

            if (err) {
                return res.status(400).send(err);
            }

            let accessToken = auth.generateAccessToken(user);

            res.status(200).json({ user: user, accessToken: accessToken });
        })
    });
}