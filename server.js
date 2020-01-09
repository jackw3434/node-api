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
    // console.log("Client Connected to group")
    socket.on("new-user", name => {
        users[socket.id] = name;
        //socket.broadcast.emit("user-connected", name)
        //  console.log("user", name, "Connected")
    })

    socket.on('create', room => {
        //  console.log("creat room ", room);
        socket.join(room);
    });

    socket.on('join', (room, whoJoined) => {

        if (io.sockets.adapter.rooms[room] && io.sockets.adapter.rooms[room].length > 2 && io.sockets.adapter.rooms[room].socket != socket.id) {
            // console.log("2 users, cannot join", io.sockets.adapter.rooms[room]);
            socket.leave(room);
        } else {

            socket.join(room);
            let mySocketID = socket.id;
            let socketIdOfuserToSendTo;
            if (io.sockets.adapter.rooms[room].sockets) {

                let listOfSockets = Object.keys(io.sockets.adapter.rooms[room].sockets);

                listOfSockets.map(id => {
                    if (id != mySocketID) {
                        socketIdOfuserToSendTo = id;
                    }
                })

                //io.to(socketIdOfuserToSendTo).emit('message', { message: whoJoined + " has joined you.", name: users[socket.id] });
            }
        }
    });

    socket.on('leave-room', (room) => {
        socket.leave(room)
    });

    socket.on('send-chat-message', (message, whoTo) => {

        let mySocketID = socket.id;
        let socketIdOfuserToSendTo;
        if (io.sockets.adapter.rooms[whoTo].sockets && io.sockets.adapter.rooms[whoTo]) {
            let listOfSockets = Object.keys(io.sockets.adapter.rooms[whoTo].sockets);

            listOfSockets.map(id => {
                if (id != mySocketID) {
                    socketIdOfuserToSendTo = id;
                }
            })

            io.to(socketIdOfuserToSendTo).emit('message', { message: message, name: users[socket.id] });
        }
    })

    socket.on("disconnect", () => {
        socket.broadcast.emit("user-disconnected", users[socket.id]);
        // console.log("Client disconnected", users[socket.id])
        delete users[socket.id];
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
require('./routes/identity/me/index')(router);
require('./routes/friend-request/index')(router);
require('./routes/friendsList/index')(router);

app.use('/api', router);

router.route('/').get(function (req, res) {
    return res.status(200).send("Hello, Chappie API");
});

app.listen(port, () => {
    console.log("Server is running on port: ", port);
});
