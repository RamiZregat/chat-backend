const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

// let array=[];

const io = new Server(server, {
  cors: {
    origin: "exp://exp.host/@ramizregat/phone-App",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    // array.push(data)
    // console.log(array);

    // console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    // console.log("User Disconnected", socket.id);
  });
});



module.exports={
  start: PORT => {
    if (!PORT) { throw new Error('Missing Port'); }
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
}
