let FriendRequest = require('../../../models/friendRequest');
let User = require('../../../models/user');
let auth = require('../../../utils/auth');
let mongoose = require("mongoose");

module.exports = function (router) {
    router.route('/friendRequest/me').get(auth.required, function (req, res) {

        let loggedInUser = req.tokenData;

        User.findById(loggedInUser.user_id, 'friend_requests', function (err, myFriendRequests) {

            if (err || !myFriendRequests || myFriendRequests.length == 0) {

                return res.status(400).send('Validation_error,11  No matching User for id ' + loggedInUser.user_id);
            }          

            myFriendRequests = myFriendRequests.friend_requests;

            myFriendRequests.map(request => {
                return mongoose.Types.ObjectId(request)
            })         

            FriendRequest.find({ _id: { $in: myFriendRequests} }, function (err, foundFriendRequests) {            

                if (err || !foundFriendRequests) {
                    return res.status(400).send('Generic_Error, get_friend_requests_failed, Unable to Get FriendRequest');
                }

                return res.status(200).json({ foundFriendRequests: foundFriendRequests });
            })
        })
    });
}