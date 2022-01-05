const cors = require('cors');
require('dotenv').config();
const app = require("express")();
const http = require("http").createServer(app);
const { Server } = require("socket.io");
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoute');
const mongoose = require('mongoose');
const User = require('./models/User');
const jwt = require('jsonwebtoken');

mongoose.connect(
    process.env.MONGO_URI,
    () => console.log('db connected.')
)

app.use(cors());
app.use(bodyParser.json());
app.use('/user', userRoute);

const io = new Server(http, {
    cors: {
        origin: "http://localhost:3000",
    }
});


io.use(async (socket, next) => {
    const { user } = socket.handshake.auth;
    try {
        const tokenCheck = await jwt.verify(user.token, process.env.JWT_SECRET);
        const onlineUser = await User.findOneAndUpdate({ _id: user.id }, { status: 'online'}, {new: true}).getUpdate()
        socket.user = { ...user, ...onlineUser};
        socket.id = user.id;
        next();
    }
    catch (error) {
        return next({ code: 403, message: "authorization failed.", type: "authoization_error" });
    }
})

io.on('connection', async (socket) => {
    console.log('Client connected: ', socket.id)

    const users = [];
    for (let [id, userSocket] of io.of("/").sockets) {
        if (id === socket.id) {
            continue;
        }
        users.push({
            ...userSocket.user,
            status: 'online',
            chat: []
        });
    }
    socket.emit('users', users)

    socket.broadcast.emit('user_connected', {
        ...socket.user,
        status: 'online',
        chat: []
    })

    socket.on('private_message', payload => {
        socket.to(payload.data.receiver.id).emit('private_message', payload.data)
    })

    socket.on('disconnect', async () => {
        console.log(socket.id, "Disconnected");
        const diconnectedUser = await User.findOneAndUpdate({ _id: socket.id}, {status: 'offline'});
        socket.broadcast.emit('user_disconnected', {
            ...socket.user,
            status: diconnectedUser.status,
            chat: []
        })
    })
})

http.listen(5000, () => {
    console.log("Server started.");
})