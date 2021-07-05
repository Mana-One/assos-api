import {Server} from "socket.io";

export const handleEvents = (io: Server) => {
    io.on('connection', (socket) => {
        socket.on('message', (message) => {
            io.emit('message', message);
        });
    });
};
