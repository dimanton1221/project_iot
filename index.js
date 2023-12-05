const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const port = process.env.PORT || 5000;

// define lib
const app = express();

// req routes
const authRoutes = require('./Routes/Auth');


// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);




app.listen(port, () => {
    console.log(`Server is running on port ${port} 🚀`);
});

