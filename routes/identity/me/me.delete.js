let User = require('../../../models/user');
let auth = require('../../../utils/auth');

module.exports = function (router) {
    router.route('/users/me/:id').delete(auth.required, function (req, res) {

        let loggedInUser = req.tokenData;

        User.deleteOne({ _id: loggedInUser.user_id }, function (err, result) {

            if (err || result.deletedCount == 0) {
                return res.status(400).json('Unable to delete User for id ' + loggedInUser.user_id);
            }

            return res.status(200).json("User " + loggedInUser.user_id + " has been deleted.");
        })
    });
}