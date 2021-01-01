const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const http = require('http').createServer(app);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

http.listen(PORT, () => {
    console.log("app running");
});

// Socket

const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log("Connection....");

    socket.on("message", (msg) => {

        // send to all connected browser
        socket.broadcast.emit('message', msg);

    });

});
