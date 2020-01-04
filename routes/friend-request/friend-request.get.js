let FriendRequest = require('../../models/friendRequest');
let User = require('../../models/user');
let mongoose = require("mongoose");

module.exports = function (router) {
    router.route('/friendRequest/:id').get( function (req, res) {

        FriendRequest.findById({ _id: req.params.id }, function (err, friendRequest) {

            if (err || !friendRequest || friendRequest.length == 0) {
                return res.status(400).send('Validation_error, No matching friend request ' + req.params.id);
            }

            res.status(200).json({ friendRequest: friendRequest });
        })
    });
}