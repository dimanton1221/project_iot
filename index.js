const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
require("./config/database");
// ambil socket io
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// socket handlers
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message', (data) => {
        console.log(data);
        // socket.emit('message', data);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


app.listen(port, () => {
    console.log(`http://127.0.0.1:${port} 🚀`);
});