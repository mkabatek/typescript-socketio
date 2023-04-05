import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import path from "path";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

io.on("connection", (socket: Socket) => {
  console.log("a client connected");

  let data: string;

  socket.on("send data", (clientData: string) => {
    data = clientData;
    console.log(`data ${clientData} received`);
    io.emit("received data", data);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
