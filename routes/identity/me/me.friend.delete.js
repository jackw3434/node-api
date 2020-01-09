let User = require('../../../models/user');
let auth = require('../../../utils/auth');

module.exports = function (router) {
    router.route('/users/me/:id').delete(auth.required, function (req, res) {
      
        User.deleteOne({ _id: req.params.id }, function (err, result) {

            if (err || result.deletedCount == 0) {             
                return res.status(400).json('Unable to delete User for id ' + req.params.id);
            }

            return res.status(200).json("User " + req.params.id + " has been deleted.");
        })
    });
}