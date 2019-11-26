const frisby = require('frisby');
let baseURL = 'http://localhost:8080/api/';
let User = require('../../../models/user');
let testHelper = require('../../../test/test-helper');

describe('users test', function () {

    beforeAll(async (done) => {
        await testHelper.init();
        await testHelper.prepareUsersCollection();
        await testHelper.loginsuperAdmin();
        return done();
    });


    describe('users.post test', function () {
        it('should POST a new user and return a status of 200 OK', function () {
            return frisby
                .post(baseURL + 'users', {
                    name: "Dave",
                    email: "dave.test@gmail.com",
                    password: "test123",
                    role: "superAdmin"
                })
                .then(function (res) {
                    expect(res.status).toBe(200);
                    expect(res._json).toBe('User: Dave has been created.');
                })
        });
    })

    describe('users.get test', function () {

        it('GET should return a status of 200 OK', function () {
            return frisby
                .get(baseURL + 'users')
                .then(function (res) {
                    expect(res.status).toBe(200);
                })
        });
    })
})