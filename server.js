const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();

const server = app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
// 'express()' method does not start the server. It is created only after the port is determined, i.e. after using the listen method, therefore this has to be below it.
const io = socket(server);

const messages = [];

app.use(express.static(path.join(__dirname, '/client')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

// the function in connection will be run separately for each client (socket) when it joins
io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);

  socket.on('message', (message) => {
    console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });
  socket.on('disconnect', () => { 
    console.log('Oh, socket ' + socket.id + ' has left') 
  });

  console.log('I\'ve added a listener on message and disconnect events \n');
});
