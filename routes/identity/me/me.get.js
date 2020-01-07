let User = require('../../../models/user');
let auth = require('../../../utils/auth');
let hasPermission = require('../../../utils/hasPermission');

module.exports = function (router) {
    router.route('/user/me/:id').get(auth.required, function (req, res) {

        let loggedInUser = req.tokenData;
        let loggedInUserID = mongoose.Types.ObjectId(loggedInUser.user_id);

        Users.findById(loggedInUserID, function (err, me) {

            if (err || !user || user.length == 0) {
                return res.status(400).send('Validation_error, No matching User for id ' + loggedInUserID);
            }

            res.status(200).json({ user: me });
        })
    });
}