
const app = require("express")();
const http = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(http, {
    cors: {
      origin: "http://localhost:3000",
    }
});


app.get('/',(req,res) => {
    res.send("hello from server.")
})


let users = []

io.use((socket, next) => {
    const auth = socket.handshake.auth
    socket.username = auth.username
    next()
})

let room = 'room';

io.on('connection', (socket) => {
    console.log("user connected", socket.id)
    socket.join(room)
    users.push(socket.id)
    socket.to(room).emit('users', users)
    socket.emit('users', users)

    socket.on('disconnect', () => {
        const offlineUser = users.findIndex(item => item === socket.id)
        users.splice(offlineUser, 1)
        socket.to(room).emit('user_disconnect', users)
    })
})


http.listen(4000, () => {
    console.log("Server started.");
})