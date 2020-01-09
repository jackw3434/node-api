const frisby = require('frisby');
let port = require('../../../../config/connectionString').serverPort;
let baseURL = 'http://localhost:' + port + '/api/';
let testHelper = require('../../../../test/test-helper');

describe('me tests', function () {

    beforeAll(async (done) => {
        await testHelper.init();
        await testHelper.loginsuperAdmin();
        return done();
    });

    describe('me.friend-request.get test', function () {
        it('GET should return a status of 200 OK', function () {
            return frisby
                .get(baseURL + 'friendRequest/me')
                .then(function (res) {
                    expect(res.status).toBe(200);
                })
        });
    });

    describe('me.friend-request.post test', function () {
        it('should POST a new friend request and return a status of 200 OK', function () {
            return frisby
                .post(baseURL + 'friendRequest/me', {
                    sender: "jack.test@gmail.com",
                    receiver: "dave.test@gmail.com"
                })
                .then(function (res) {
                    expect(res.status).toBe(200);
                })
        });
    });

    describe('friendsList.me.get test', function () {
        it('should get my friends list and return a status of 200 OK', function () {
            return frisby
                .get(baseURL + 'friendsList/me')
                .then(function (res) {
                    expect(res.status).toBe(200);
                })
        });
    })
})