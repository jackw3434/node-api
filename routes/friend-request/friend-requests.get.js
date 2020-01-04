let FriendRequest = require('../../models/friendRequest');

module.exports = function (router) {
    router.route('/friendRequest').get(function (req, res) {

        FriendRequest.find({},function (err, friendRequest) {

            if (err) {
                return res.status(400).send('Generic_Error, get_friend_requests_failed, Unable to Get FriendRequest');
            }
                        
            return res.status(200).json({ friendRequest: friendRequest });
        })
    });
}