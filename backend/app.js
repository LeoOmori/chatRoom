const express = require('express');
const app = express();
const http = require('http');
const formatMessage = require("./utils/formatMessage");
const users = require('./utils/users');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


io.on('connection', (socket) => {

    socket.on('joinRoom', ({userName, room}) => {

        const user = users.userJoin(socket.id,userName,room);
        socket.join(room)

        socket.broadcast.to(room).emit("message", formatMessage('server',`${userName} joined the chat`));

        io.to(room).emit("roomUsers", {
            users: users.getRoomUsers(room)
        })
    })


    socket.on('disconnect', () => {

        const user = users.userLeave(socket.id);

        if(user){
            
            socket.broadcast.to(user.room).emit("message", formatMessage("server",`${user.username} disconnected`));
        
            io.to(user.room).emit("roomUsers", {
                users: users.getRoomUsers(user.room)
            })
        }

    })

    socket.on('chatMessage', (msg) =>{

        const user = users.getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.username,msg));
    })

});

server.listen(3333, () => {
    console.log('listening on *:3000');
});