let frisby = require('frisby');
let mongoose = require('mongoose');
let connectionString = require('../config/connectionString').connectionString;
let initMongoose = require('../init/init-mongoose');
let User = require('../models/user');
let port = require('../config/connectionString').serverPort;
let baseURL = 'http://localhost:'+ port +'/api/';
let auth = require('../utils/auth');
let server = require('../server');

let mongooseConnect = async function () {
    server;
};

let prepareUsers = async function () {
    await emptyUsersCollection();
    await populateUsersCollection();
};

let testHelper = {
    loginsuperAdmin:
        async function () {
            return frisby.post(baseURL + "login", {
                "email": "jack.test@gmail.com",
                "password": "test123"
            }, {
                json: true
            })
                .then(function (res) {
                    token = res._json.accessToken;
                    frisby.globalSetup({
                        request: {
                            headers: {
                                'Authorization': token,
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
    console.log("Deleting");
    await User.deleteMany().exec();
    console.log("Deleted");
};

let populateUsersCollection = async function () {

    let user = new User({
        _id: new mongoose.Types.ObjectId("06a9fab994a0eef9618e9d58"),
        first_name: "Jack",
        surname: "Williams",
        email: "jack.test@gmail.com",
        password: auth.hashPassword("test123"),
        role: "superAdmin"
    });

    await user.save();

    let user2 = new User({
        _id: new mongoose.Types.ObjectId("8c835ce289db541d3cdc4183"),
        first_name: "John",
        surname: "Test",
        email: "john.test@gmail.com",
        password: auth.hashPassword("test123"),
        role: "superAdmin"
    });

    await user2.save();

    let user3 = new User({
        _id: new mongoose.Types.ObjectId("64706e408463696b3232a513"),
        first_name: "James",
        surname: "Test",
        email: "james.test@gmail.com",
        password: auth.hashPassword("test123"),
        role: "superAdmin"
    });

    await user3.save();

    console.log("Populated");
};