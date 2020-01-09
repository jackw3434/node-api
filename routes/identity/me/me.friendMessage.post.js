let User = require('../../../models/user');
let FriendsList = require('../../../models/friendsList');
let auth = require('../../../utils/auth');

module.exports = function (router) {
    router.route('/friend/sendMessage').post(auth.required, function (req, res) {

        let frienshipID = req.body.frienshipID;
        let messageToSend = req.body.messageToSend;

        FriendsList.findById(frienshipID, function (err, friendList) {

            if (err || !friendList) {
                return res.status(400).send(err);
            }

            friendList.messageLog.push(messageToSend)
           
            friendList.save(function (err, newMessage) {
           
                if (err) {
                    return res.status(400).send(err);
                }

                return res.status(200).json("Message Sent");
            })
        })
    });
}