const express = require('express');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv')

const app = express();
dotenv.config()

app.use(cors());
const PORT = process.env.PORT
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
    }
});

io.on("connection", (socket) => {
    console.log(`User connected :${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with id= ${socket.id} joined Room`);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});