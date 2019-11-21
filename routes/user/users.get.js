let Users = require('../../models/user');

module.exports = function (router) {
    router.route('/users').get(function (req, res) {

        Users.find(function (err, users) {

            if (err) {
                return res.status(400).send(err);
            }

            let data = [];

            Object.keys(users).forEach((key) => {
                let val = users[key];
                data.push({ id: val._id, name: val.name })
            });

      

            res.status(200).json({ users: data });
        })
    });
}