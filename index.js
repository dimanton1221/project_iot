const { subscribe } = require('diagnostics_channel');
const express = require('express');
const app = express();
const http = require('http');
socket = require('socket.io');
const server = http.createServer(app);
const io = socket(server, {
    cors: {
        origin: "*",
    }
});
// tambahkan statis file folder 
app.use(express.static('public'));
const port = 3000;
const mqtt = require('mqtt');
const cors = require('cors');

app.use(cors());

const mqttc = mqtt.connect('mqtt://127.0.0.1:1883');
mqttc.subscribe('Parkir/1');
mqttc.subscribe('Parkir/2');



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    mqttc.on('message', function (topic, message) {
        socket.emit(topic.toString(), message.toString());
    });
    socket.on('disconnect', () => {
        console.log('arek e ilang cuy');
    });
}
);


server.listen(port, () => console.log(`server is running on port ${port}`));