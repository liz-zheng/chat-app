const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = process.env.PORT || 4001;
const bodyParser = require('body-parser')

// const index = require("./routes/index");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// app.use(index);
const server = http.createServer(app);
const io = socketIo(server);

let interval;

io.on("connection", socket => {
  if(interval) {
    clearInterval(interval)
  }
  let roomId = socket.handshake.query['roomId']
  console.log("Room id: "+roomId)
  console.log("New client connected"), setInterval(
    () => getApiAndEmit(socket, roomId),
    3000
  );
  socket.on("disconnect", () => console.log("Client disconnected"));
});
const getApiAndEmit = async (socket, roomId) => {
  // app.post('/api/rooms/:id/messages', function(req, res) {
  //   let roomId = req.param.id;
  // })
  console.log("is it being called");

  try {
    const res = await axios.get(
      `http://localhost:8080/api/rooms/${roomId}/messages`
    );
    socket.emit("FromAPI", res.data);
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};
server.listen(port, () => console.log(`Listening on port ${port}`));
