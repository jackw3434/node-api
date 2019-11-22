let Users = require('../../models/user');

module.exports = function (router) {
    router.route('/users').get(function (req, res) {

        Users.find(function (err, users) {

            if (err) {
                return res.status(400).send('Generic_Error, getUsers_failed, Unable to Get Users');
            }

            let data = [];

            Object.keys(users).forEach((key) => {
                let val = users[key];
                data.push({ id: val._id, name: val.name })
            });

      

            return res.status(200).json({ users: data });
        })
    });
}