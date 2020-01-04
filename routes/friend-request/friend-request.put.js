let FriendRequest = require('../../models/friendRequest');

module.exports = function (router) {
    router.route('/friendRequest/:id').put(function (req, res) {

        FriendRequest.findById({ _id: req.params.id }, function (err, friendRequest) {
          
            friendRequest.status = req.body.friendRequestResponse;

            // Need to notify the user

            // Need to add the user to their friends list

            friendRequest.save(function (err, editedFriendRequest) {

                if (err) {
                    return res.status(400).send(err);
                }

                return res.status(200).json("User: " + editedFriendRequest + " has been edited.");
            })
        })
    });
}