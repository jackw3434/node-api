let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let port = process.env.PORT || 8080;
let router = express.Router();
let connectionString = require('./config/connectionString').connectionString;
let initMongoose = require('./init/init-mongoose');

initMongoose.connectToMongoose(connectionString);

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

require('./routes/user/index')(router);
require('./routes/identity/index')(router);

app.use('/api', router);

app.listen(port);


