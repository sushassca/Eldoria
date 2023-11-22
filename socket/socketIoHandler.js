// @ts-nocheck
// socketIoHandler.js
import { Server } from 'socket.io';

export default function injectSocketIO(server) {
    const io = new Server(server);
    io.on('connection', (socket) => {
      console.log("connection");
        socket.on("action", (arg) => {
          console.log("action");
          io.emit('eventFromServer', arg)
        })
    })
}