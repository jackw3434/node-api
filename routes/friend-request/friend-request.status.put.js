let FriendRequest = require('../../models/friendRequest');
let FriendsList = require('../../models/friendsList');
let User = require('../../models/user');
let auth = require('../../utils/auth');

module.exports = function (router) {
    router.route('/friendRequest/:id').put(auth.required, function (req, res) {

        let friendRequestId = req.params.id;

        FriendRequest.findById({ _id: friendRequestId }, function (err, friendRequest) {

            friendRequest.status = req.body.status;

            if (req.body.status === "Accepted") {

            } else if (req.body.status === "Rejected") {

            }

            friendRequest.save(function (err, editedFriendRequest) {

                if (err) {
                    return res.status(400).send(err);
                }

                // Need to notify the user

                // Need to add the user to their friends list

                let sender = editedFriendRequest.sender;
                let receiver = editedFriendRequest.receiver;

                let projection = 'first_name surname email friend_requests friendsList';

                User.find({ email: { $in: [sender, receiver] } }, projection, function (err, users) {

                    if (err || !users || users.length == 0) {
                        return res.status(400).send('Validation_error, No matching Users.', err);
                    }

                    let friendToAdd = new FriendsList();

                    friendToAdd = {
                        friendObjects: [{
                            first_name: users[0].first_name,
                            surname: users[0].surname,
                            email: users[0].email
                        },
                        {
                            first_name: users[1].first_name,
                            surname: users[1].surname,
                            email: users[1].email
                        }]
                    };

                    users[0].friend_requests.splice(users[0].friend_requests.indexOf(friendRequestId), 1);
                    users[1].friend_requests.splice(users[1].friend_requests.indexOf(friendRequestId), 1);

                    users[0].friendsList.push(friendToAdd);
                    users[1].friendsList.push(friendToAdd);

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

                })

                return res.status(200).json("User: " + editedFriendRequest + " has been edited.");
            })
        })
    });
}