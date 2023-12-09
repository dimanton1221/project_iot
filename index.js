const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const mqtt = require('mqtt');
require('dotenv').config();
const port = process.env.PORT || 5000;

// define lib
const app = express();

// req routes
const authRoutes = require('./Routes/Auth');
const AirRoutes = require("./Routes/VolumeAir");
const HistoryAirRoutes = require("./Routes/HistoryAir");

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/air', AirRoutes);
app.use('/api/history', HistoryAirRoutes);



app.listen(port, () => {
    console.log(`SERVER E NGANGGO PORT ${port} 🚀`);
});

