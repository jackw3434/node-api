let Users = require('../../models/user');

module.exports = function (router) {
    router.route('/users').get(function (req, res) {

        Users.find({},'first_name surname _id',function (err, users) {

            if (err) {
                return res.status(400).send('Generic_Error, getUsers_failed, Unable to Get Users');
            }
                        
            return res.status(200).json({ users: users });
        })
    });
}