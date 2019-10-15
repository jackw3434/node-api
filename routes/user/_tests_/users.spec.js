const frisby = require('frisby');
let baseURL = 'http://localhost:8080/api/';
let User = require('../../../models/user');
let testHelper = require('../../../test/test-helper');

describe('users test', function () {

    beforeAll(async (done) => {
        await testHelper.init;
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