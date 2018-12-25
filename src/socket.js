const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = process.env.PORT || 4001;

const app = express();

const server = http.createServer(app);
const io = socketIo(server);

let interval;

io.on("connection", socket => {
  if(interval) {
    clearInterval(interval)
  }
  let roomId = socket.handshake.query['roomId']
  console.log("New client connected"), setInterval(
    () => getApiAndEmit(socket, roomId),
    2000
  );
  socket.on("disconnect", () => console.log("Client disconnected"));
});
const getApiAndEmit = async (socket, roomId) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/rooms/${roomId}/messages`
    );
    socket.emit("getMessages", res.data);
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};
server.listen(port, () => console.log(`Listening on port ${port}`));
