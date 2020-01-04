let User = require('../../models/user');
let auth = require('../../utils/auth');

module.exports = function (router) {
    router.route('/login').post(auth.optional, function (req, res) {
   
        let userEmail, userPassword;
   
        if(req.body && req.body.email && req.body.password){
            userEmail = req.body.email;
            userPassword = req.body.password;
        } else {
            return res.status(400).send("Missing Email or Password");
        }        

        User.find({ email: userEmail }, function (err, user) {
         
            if (err || !user || user.length == 0) {
                return res.status(400).send('User Not Found');
            }

            if (auth.hashPassword(userPassword) == user[0].password) {

                let accessToken = auth.generateAccessToken(user[0]);

                return res.status(200).json({ successMessage: "User Logged In", userData: user[0], accessToken: "Token " + accessToken });

            } else {

                return res.status(400).send("Incorrect Password");
            };
        });
    });
}