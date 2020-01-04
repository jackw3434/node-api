let FriendRequest = require('../../models/friendRequest');
let User = require('../../models/user');
let auth = require('../../utils/auth');
let mongoose = require("mongoose");

module.exports = function (router) {
    router.route('/friendRequest/:id').delete(auth.optional, function (req, res) {

        let friend_id = mongoose.Types.ObjectId(req.params.id)

        User.find({ friend_requests: friend_id }, function (err, users) {

            if (err || !users[0] || users[0].length == 0) {
                return res.status(400).send('Validation_error, No matching Friend Requests for id ' + friend_id);
            }
            if (err || !users[1] || users[1].length == 1) {
                return res.status(400).send('Validation_error, No matching Friend Requests for id ' + friend_id);
            }

            users[0].friend_requests.splice(users[0].friend_requests.indexOf(friend_id), 1);
            users[1].friend_requests.splice(users[1].friend_requests.indexOf(friend_id), 1);

            users[0].save(function (err, newUser) {

                if (err) {
                    return res.status(400).send(err);
                }

                users[1].save(function (err, newUser) {

                    if (err) {
                        return res.status(400).send(err);
                    }
                })
            })

            FriendRequest.deleteOne({ _id: friend_id }, function (err, result) {

                if (err || result.deletedCount == 0) {
                    return res.status(400).json('Unable to delete User for id ' + friend_id);
                }

                return res.status(200).json("FriendRequest " + friend_id + " has been deleted.");
            })
        })
    });
}