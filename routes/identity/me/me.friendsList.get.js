let FriendsList = require('../../../models/friendsList');
let User = require('../../../models/user');
let auth = require('../../../utils/auth');
let mongoose = require("mongoose");

module.exports = function (router) {
    router.route('/friendsList/me').get(auth.required, function (req, res) {

        let loggedInUser = req.tokenData;
        let loggedInUserID = mongoose.Types.ObjectId(loggedInUser.user_id);

        User.findById(loggedInUserID, 'friendsList', function (err, me) {

            if (err || !me || me.length == 0) {
                return res.status(400).send('Validation_error, No matching User for id ' + loggedInUserID);
            }

            let friendListIds = me.friendsList;

            FriendsList.find({ '_id': { $in: friendListIds } }, function (err, friendList) {

                if (err) {

                    return res.status(400).send(err);
                }             

                return res.status(200).json({ friendsList: friendList });
            })
        })
    });
}