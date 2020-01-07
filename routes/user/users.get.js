let Users = require('../../models/user');
let hasPermission = require('../../utils/hasPermission');
let auth = require('../../utils/auth');

module.exports = function (router) {
    router.route('/users').get(auth.required, function (req, res) {
  
        Users.find({}, function (err, users) {

            if (err) {
                return res.status(400).send('Generic_Error, getUsers_failed, Unable to Get Users');
            }

            return res.status(200).json({ users: users });
        })
    });
}

