const frisby = require('frisby');
let baseURL = 'http://localhost:8080/api/';
let mongoose = require('mongoose');
let User = require('../../../models/user');
let connectionString = require('../../../config/connectionString').connectionString;

const option = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

describe('users test', function () {

    beforeAll(async (done) => {

        await mongoose.connect(connectionString, option, (err) => {
            if (err) {
                console.log(err);
                console.log('Retrying Database Connection');
                connectToMongoose();
            } else {
                console.log("Database Connected for tests");
            }
        });

        return done();
    });

    describe('users.get test', function () {

        it('GET should return a status of 200 OK', function () {
            return frisby
                .get(baseURL + 'users')
                .then(function (res) {
                    console.log("user res: ", res);
                    expect(res.status).toBe(200);
                })
        });
    })
})