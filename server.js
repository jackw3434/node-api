let express = require('express');
let app = express();
var http = require('http').Server(app);
let bodyParser = require('body-parser');
let port = require('./config/connectionString').serverPort;
let router = express.Router();
let io = require('socket.io')(7000);
let connectionString = require('./config/connectionString').connectionString;
let initMongoose = require('./init/init-mongoose');
let mongoose = require('./init/init-mongoose').mongoose;

initMongoose.connectToMongoose(connectionString);

let users = {};

io.on('connection', socket => {
    console.log("Client Connected to group")
    socket.on("new-user", name => {
        users[socket.id] = name;
        socket.broadcast.emit("user-connected", name)
        console.log("user", name, "Connected")
    })

    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] });
    })
    socket.on("disconnect", () => {
        socket.broadcast.emit("user-disconnected", users[socket.id]);
        delete users[socket.id];
        console.log("Client disconnected")
    });
})



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//CORS middleware
let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Access-Control-Allow-Headers, Authorization');
    next();
}

router.use(allowCrossDomain);

//endpoint routes

require('./routes/user/index')(router);
require('./routes/identity/index')(router);

app.use('/api', router);

app.listen(port, () => {
    console.log("Server is running on port: ", port);   
});

//
