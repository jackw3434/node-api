let frisby = require('frisby');
let mongoose = require('mongoose');
let connectionString = require('../config/connectionString').connectionString;
let initMongoose = require('../init/init-mongoose');


let mongooseConnect = async function () {
    await initMongoose.connectToMongoose(connectionString);
};

let prepareUsers = async function () {
    await emptyUsersCollection();
    await populateUsersCollection();
};

let testHelper = {
    loginAdmin:
        async function () {
            return frisby.post(baseURL + "login", {
                "email": "admin@test.com",
                "password": "Test123123"
            }, {
                json: true
            })
                .then(function (res) {
                    token = res._json.accessToken;
                    frisby.globalSetup({
                        request: {
                            headers: {
                                'Authorization': "Token " + token,
                                'Content-Type': 'application/json',
                            }
                        }
                    });
                })
        },
    prepareUsersCollection: prepareUsers,
    init: mongooseConnect
};

module.exports = testHelper;

let emptyUsersCollection = async function () {
    await User.deleteMany().exec();
};

let populateUsersCollection = async function () {

    let user = new User({
        _id: new mongoose.Types.ObjectId("06a9fab994a0eef9618e9d58"),
        first_name: "superAdmin",
        last_name: "superAdmin",
        email: "superAdmin@test.com",
        // password: auth.hashPassword("Test123123"),
        role: "",
    });

    await user.save();

    let user2 = new User({
        _id: new mongoose.Types.ObjectId("8c835ce289db541d3cdc4183"),
        first_name: "clinician",
        last_name: "clinician",
        email: "clinician@test.com",
        // password: auth.hashPassword("Test123123"),
        role: "",
    });

    await user2.save();
};