let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let port = process.env.PORT || 8080;
let router = express.Router();
let mongoose = require('mongoose');
let connectionString = require('./config/connectionString.js').connectionString;

const option = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000,
    useCreateIndex: true,
    useNewUrlParser: true,
};

let connectToMongoose = function () {

    mongoose.connect(connectionString, option, (err) => {
        if (err) {
            console.log(err);
            console.log('Retrying Database Connection');
            connectToMongoose();
        } else {
            console.log("Database Connected");
        }
    });
}
console.log(connectionString);
connectToMongoose();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//CORS middleware
let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
}

router.use(allowCrossDomain);

//endpoint routes

//require('./routes/user/index')(router);

app.use('/api', router);

app.listen(port);


