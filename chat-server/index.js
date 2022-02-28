const cors = require('cors');
require('dotenv').config();
const app = require("express")();
const http = require("http").createServer(app);
const { Server } = require("socket.io");
const bodyParser = require('body-parser');
const userController = require('./controllers/user.controller');
const mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGO_URI,
    () => console.log('db connected.')
)

app.use(cors());
app.use(bodyParser.json());
app.use('/user', userController);

const io = new Server(http, {
    cors: {
        origin: "http://localhost:3000",
    }
});



http.listen(5000, () => {
    console.log("Server started.");
})