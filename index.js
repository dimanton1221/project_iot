const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
require("./config/database");

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});



app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));





const authRouter = require('./Routers/auth');
const secure_page = require('./Routers/secure');

const checkAuth = require('./Middlewares/CheckAuth');

app.use('/api/auth', authRouter);
app.use('/api/checkToken', checkAuth, secure_page);


app.get('/', (req, res) => {
    res.send('Hello World!');
});


io.on('connection', (socket) => {

    socket.on("emm", (data) => {
        console.log(data);
        socket.emit("emm", data);
    });

    console.log('Apakah itu kamu ? 🙂');


    socket.on('message', (data) => {
        console.log("emm senengnya dapat pesan dari kamu 🙂");
        console.log(data);

    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});





server.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
