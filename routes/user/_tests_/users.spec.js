const frisby = require('frisby');
let port = require('../../../config/connectionString').serverPort;
let baseURL = 'http://localhost:' + port + '/api/';
//let User = require('../../../models/user');
let testHelper = require('../../../test/test-helper');

describe('users test', function () {

    beforeAll(async (done) => {
        await testHelper.init();
        await testHelper.emptyFriendRequestCollection();
        await testHelper.emptyFriendsListsCollection();
        await testHelper.prepareUsersCollection();
        await testHelper.loginsuperAdmin();
        return done();
    });

    describe('users.get test', function () {
        it('GET should return a status of 200 OK', function () {
            return frisby
                .get(baseURL + 'users')
                .then(function (res) {
                    expect(res.status).toBe(200);
                })
        });
    });

    describe('user.get by ID test', function () {
        it('GET by ID should return a status of 200 OK', function () {
            return frisby
                .get(baseURL + 'user/06a9fab994a0eef9618e9d58')
                .then(function (res) {
                    expect(res.status).toBe(200);
                    expect(res._json.user.first_name).toBe("Jack");
                    expect(res._json.user.surname).toBe("Williams");
                    expect(res._json.user.email).toBe("jack.test@gmail.com");
                })
        });

        it('GET by BAD ID should return a status of 400 BAD REQUEST', function () {
            return frisby
                .get(baseURL + 'user/6a0889f625d16269ecb999bd')
                .then(function (res) {
                    expect(res.status).toBe(400);
                    expect(res._body).toBe('Validation_error, No matching User for id 6a0889f625d16269ecb999bd');
                })
        });
    });

    describe('users.post test', function () {
        it('should POST a new user and return a status of 200 OK', function () {
            return frisby
                .post(baseURL + 'users', {
                    first_name: "Dave",
                    surname: "Test",
                    email: "dave.test@gmail.com",
                    password: "test123",
                    role: "superAdmin"
                })
                .then(function (res) {
                    expect(res.status).toBe(200);
                    expect(res._json).toBe('User: Dave has been created.');
                })
        });

        it('should not POST a new user with missing credentials and should return a status of 400 BAD REQUEST', function () {
            return frisby
                .post(baseURL + 'users', {
                    first_name: "Dave",
                    email: "dave.test@gmail.com",
                    password: "test123",
                    role: "superAdmin"
                })
                .then(function (res) {
                    expect(res.status).toBe(400);
                    expect(res._body).toBe('validation_error, credentials are required.');
                })
        });
    })

    describe('users.put test', function () {
        it('should PUT a user and return a status of 200 OK', function () {
            return frisby
                .put(baseURL + 'users/8c835ce289db541d3cdc4183', {
                    first_name: "JohnEdit",
                    surname: "TestEdit",
                    email: "johnEdit.test@gmail.com",
                })
                .then(function (res) {
                    expect(res.status).toBe(200);
                    expect(res._json).toBe('User: JohnEdit has been edited.');
                })
        });

        it('should not PUT a users password and should return a status of 400 BAD REQUEST', function () {
            return frisby
                .put(baseURL + 'users/8c835ce289db541d3cdc4183', {                  
                    password: "change password test",
                })
                .then(function (res) {
                    expect(res.status).toBe(400);
                    expect(res._body).toBe("Cannot Change a User's Password");
                })
        });

        it('should not PUT a users role and should return a status of 400 BAD REQUEST', function () {
            return frisby
                .put(baseURL + 'users/8c835ce289db541d3cdc4183', {                  
                    role: "changeing role",
                })
                .then(function (res) {
                    expect(res.status).toBe(400);
                    expect(res._body).toBe("Cannot Change a User's Role");
                })
        });
    })

    describe('users.delete test', function () {
        it('should DELETE a user and return a status of 200 OK', function () {
            return frisby
                .del(baseURL + 'users/8c835ce289db541d3cdc4183')
                .then(function (res) {
                    expect(res.status).toBe(200);
                    expect(res._json).toBe('User 8c835ce289db541d3cdc4183 has been deleted.');
                })
        });

        it('should NOT DELETE a user that and return a status of 400 BAD REQUEST', function () {
            return frisby
                .del(baseURL + 'users/8c835ce289db541d3cdc4183')
                .then(function (res) {
                    expect(res.status).toBe(400);
                    expect(res._json).toBe('Unable to delete User for id 8c835ce289db541d3cdc4183');
                })
        });
    })
})