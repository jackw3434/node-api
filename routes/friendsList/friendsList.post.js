let FriendRequest = require('../../models/friendRequest');
let User = require('../../models/user');
let auth = require('../../utils/auth');
let mongoose = require("mongoose");

module.exports = function (router) {
    router.route('/friendRequest').post(auth.required, function (req, res) {        

        let newRequest = new FriendRequest(req.body);
        let sender = newRequest.sender;
        let requestStatus = newRequest.status;
        let friendToInvite = newRequest.receiver;

        User.find({ 'email': { $in: [friendToInvite, sender] } }, function (err, users) {

            if (err || !users[0] || users[0].length == 0) {
                return res.status(400).send('Validation_error, No email matching for ' + friendToInvite);
            }
            if (err || !users[1] || users[1].length == 1) {
                return res.status(400).send('Validation_error, No email matching for ' + sender);
            }

            let requestSender;
            users.map((user) => {
                if (user.email == sender) {
                    return requestSender = user;
                }
            })

            newRequest.save(function (err, newFriendRequest) {

                if (err) {
                    if (err.code == 11000) {
                        return res.status(409).send('friend_request_rejection_error, A Friend Request to ' + friendToInvite + ' has already been made.');
                    }
                    return res.status(400).send(err);
                }

                newRequest._id = mongoose.Types.ObjectId(newRequest._id)

                users[0].friend_requests.push(newRequest._id);
                users[1].friend_requests.push(newRequest._id);

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

                return res.status(200).json("Friend Request: " + newFriendRequest + " has been created.");
            })        
        })
    });
}