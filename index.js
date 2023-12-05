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

// pokoknya itu kalau pesan masuk 
// mqttc.on('message', function (topic, message) {
//     // message is Buffer
//     console.log(topic.toString() + " " + message.toString());
//     io.emit('message', message.toString());
//     // client.end()
// })

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/parkirsek', (req, res) => {
    res.sendFile(__dirname + '/buatanIzzam.html')
})


app.get('/parkir', (req, res) => {
    res.sendFile(__dirname + '/apa.html')
})

app.get('/css.css', (req, res) => {
    res.sendFile(__dirname + '/parkir.css')
})


io.on('connection', (socket) => {
    // console.log("ada yang konek");

    mqttc.on('message', function (topic, message) {
        // message is Buffer
        // console.log("ngirim coy");
        socket.emit(topic.toString(), message.toString());

    });


    socket.on('disconnect', () => {
        console.log('arek e ilang cuy');
    });
}
);


server.listen(port, () => console.log(`server is running on port ${port}`));