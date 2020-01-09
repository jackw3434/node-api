let FriendsList = require('../../models/friendsList');
let auth = require('../../utils/auth');

module.exports = function (router) {
    router.route('/friendsList').get(auth.required, function (req, res) {

        FriendsList.find({}, function (err, friendsList) {

            if (err) {
                return res.status(400).send('Generic_Error, get_friendsList_failed, Unable to Get friendsList');
            }

            return res.status(200).json({ friendsList: friendsList });
        })
    });
}