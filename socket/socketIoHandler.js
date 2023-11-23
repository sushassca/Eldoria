// @ts-nocheck
// socketIoHandler.js
import { Server } from 'socket.io';

export default function injectSocketIO(server) {
    const io = new Server(server);
    io.on('connection', (socket) => {
      console.log("Hello from server 🙌");
        socket.on("action", (arg) => {
          io.emit('eventFromServer', arg)
        })
    })
}