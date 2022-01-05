const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());
const PORT=process.env.PORT || 3001;

const server = http.createServer(app);

let arrayRooms=[];

const io = new Server(server, {
  cors: {
    origin: "http://localhost:19006",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    // socket.join(data.id);
    socket.join('room');
    console.log(data);
    arrayRooms.push(data)
    // console.log(array);

    // console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    // socket.to(data.room).emit("receive_message", data);
    socket.to(data.room).emit("receive_message", data);
    console.log("massage sent",data);
  });

  socket.on("disconnect", () => {
    // console.log("User Disconnected", socket.id);
  });
});

server.listen(PORT, () => {
  console.log("SERVER RUNNING");
});


