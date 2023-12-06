const express = require('express');
const app = express();
const cors = require('cors');
const port = 4000;
require("./config/database");
const mqtt = require('mqtt');
const socketIO = require('socket.io');
const http = require('http');
const serverSocket = http.createServer(app);
const anjirr = socketIO(serverSocket, {
    cors: {
        origin: '*',
    }
});

anjirr.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


const client = mqtt.connect('mqtt://127.0.0.1:1883');


client.on('connect', function () {
    client.subscribe('Timbangan');
});





// pengennya sih ngambil kamu tapi kok dapatnya socket io
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});
// pengennya sih pengen memberikakanmu batasan biar tidak diambil orang .
// tapi aku tidak memilikimu , yaudah mending aku cors aja deh untuk semua orang aja 
// sambil berharap kamu bisa menjadi milikku
app.use(cors());
// aku bantu support ehh nggak dianggep aku supportin terusin aja 
// penting kamu bahagia , xixixi 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// setiap alur yang kamu lalui aku akan selalu ada disampingmu
// sekarang aku buat alur biar aku bisa menatah masa depanku tanpa kamu
// Routers
const authRouter = require('./Routers/auth');
const secure_page = require('./Routers/secure');
// middlewares
const checkAuth = require('./Middlewares/CheckAuth');

app.use('/api/auth', authRouter);
app.use('/api/checkToken', checkAuth, secure_page);


app.get('/', (req, res) => {
    res.send('Hello World!');
});



// socket io ini itu kayak gambaran serealtime apa aku ke kamu
io.on('connection', (socket) => {
    // sambil aku bingung aku selalu menunggu emm mu
    socket.on("emm", (data) => {
        console.log(data);
        socket.emit("emm", data);
    });

    console.log('Apakah itu kamu ? 🙂');
    // ini lo cuma contoh mau ngapain kamu ?
    // yee dapat pesan dari kamu 
    socket.on('message', (data) => {
        console.log("emm senengnya dapat pesan dari kamu 🙂");
        console.log(data);
        // socket.emit('message', data);
    });
    socket.on('disconnect', () => {
        console.log('orangnya hilang coyy');
    });

    client.on('message', function (topic, message) {
        socket.emit('Timbangan', message.toString());
    });


});


// emm yaudah deh , aku gak bisa buka hati kamu , 
// yaudah aku lakukan yang yang bisa aku lakukan, contoh OPEN PORT
// open port ini kayak hati yang selalu menunggu kamu
server.listen(port, () => {
    console.log(`http://127.0.0.1:${port} 🚀`);
});
